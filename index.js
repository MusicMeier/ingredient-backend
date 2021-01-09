const http = require('http');
const hostname = '127.0.0.1';
const port = 7001;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-type', 'text/plain');
  response.end('Hello World\n');
});

server.listen(port,  hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});