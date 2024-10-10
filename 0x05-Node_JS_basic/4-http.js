// Creating a small HTTP server using Node HTTP module
const { createServer } = require('http');

// Set hostname and Port
const hostname = 'localhost';
const port = 1245;

// create a server object
const app = createServer((_, res) => {
  const response = 'Hello Holberton School!';

  res.setHeader('Content-Type', 'text/plain');
  res.statusCode = 200;
  res.end(response);
  res.setHeader('Content-Length', response.length);
  res.write(Buffer.from(response));
});

// listen to the server
app.listen(port, hostname, () => {
  process.stdout.write(`Server running at http://${hostname}:${port}\n`);
});

module.exports = app;
