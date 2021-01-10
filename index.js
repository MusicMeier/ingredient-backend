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

let string = "WHEAT SOY AVACADO EGG TOMATOES CHEESE"
let photoWords = "";

function compareStrings(string, photoWords){
  let newString = string.split(' ')
  let updatedphotoWords = photoWords.split(' ')
  let matchingWords = newString.filter(element => updatedphotoWords.includes(element));
  return matchingWords
}

app.set('view engine','ejs');
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
        photoWords = text;
        console.log(photoWords = text)
        return compareStrings(string, photoWords);
      })()
      .then(result => {
        console.log(response.json(result))
      })
    });
  });

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});