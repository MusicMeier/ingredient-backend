// const { request } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer')
const cors = require('cors');
const { response } = require('express');
const Tesseract = require('tesseract.js');
const { worker } = require('cluster');
const { createWorker } = Tesseract;

// const worker = createWorker({
//   logger: m => console.log(m)
// });

const port = 7001;

let string = "carrots, lima beans, blueberry, potatos, green bean, tomatos, avacados"
let photoWords = "carrots, lima beans, apple, blueberry, strawberry"

function compareStrings(string, photoWords){
  let newString = string.split(',')
  let updatedphotoWords = photoWords.split(',')
  let matchingWords = newString.filter(element => updatedphotoWords.includes(element));
  return matchingWords
}

app.set('view engine','ejs');
// app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads')
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})

let upload = multer({storage: storage}).single('label');

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/upload', upload, (request, response) => {
  console.log(request.file)
  upload(request, response, error => {
      if(error) {
        console.log(error)
        return response.send('Something went wrong');
      }

      let image = fs.readFileSync(
        `./uploads/${request.file.originalname}`, 
        {
          encoding: null
        }
      );
      (async () => {
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: {text} } = await worker.recognize(image);
        console.log(text);
        console.log(compareStrings(string, photoWords));
      })()
      // .then(result => {
      //   console.log(result)
      // })
      // .finally(() => worker.terminate)
    });
  });

// Array.prototype.diff = function(photoWords){
//   let result = [];
//   this.sort();
//   photoWords.sort();
//   for(var i=0; i < this.length; i++){
//     if(photoWords.indexOf(this[i]) > -1){
//       result.push(this[i])
//     }
//   }
//   return result
// }
// console.log(newString.diff(updatedphotoWords))

// function compareStrings(photoWords, string){
//   let newString = string.split(',')
//   let updatedphotoWords = photoWords.split(',')
//   // let result = [];
//   // for(i = 0; i < newString.length; i++ ){
//   //   for(j=0; updatedphotoWords.length; j++){
//   //     if (newString[i].equals(updatedphotoWords[j])){
//   //       result = result.push(newString[i])
//   //     }
//   //   }
//   // }
//   return console.log(newString), console.log(updatedphotoWords)
// }

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});