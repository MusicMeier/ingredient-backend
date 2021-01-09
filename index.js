// const { request } = require('express');
const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer')
const cors = require('cors');
const { createWorker } = require('tesseract.js');
const { response } = require('express');
const worker = createWorker({
  logger: m => console.log(m)
});
const port = 7001;

app.use(express.json())
app.use(cors());
// const server = http.createServer((request, response) => {
//   response.statusCode = 200;
//   response.setHeader('Content-type', 'text/plain');
//   response.end('Hello World\n');
// });

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, './uploads')
  },
  filename: (request, file, callback) => {
    callback(null, file.originalname)
  }
})

const upload = multer({storage: storage}).single('label');

app.set('view engine','ejs');

app.get('/', (request, response) => {
  response.render('index')
})

app.post('/upload', (request, response) => {
  upload(request, response, error => {
    console.log(request.file)
  })
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});