// Creating a small HTTP server using Node HTTP module
const http = require('http');

// Set hostname and Port
const hostname = 'localhost';
const port = 1245;
const app = http.createServer();

// create a server object
app.on('request', (_, res) => {
  const response = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', response.length);
  res.statusCode = 200;
  res.write(Buffer.from(response));
});

// listen to the server
app.listen(port, hostname, () => {
  process.stdout.write(`Server running at http://${hostname}:${port}\n`);
});

module.exports = app;
