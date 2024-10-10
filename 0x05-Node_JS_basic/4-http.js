// Creating a small HTTP server using Node HTTP module
const { createServer } = require('http');

// Set hostname and Port
const hostname = '127.0.0.1';
const port = 1245;

// create a server object
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Holberton School!');
});

// listen to the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
