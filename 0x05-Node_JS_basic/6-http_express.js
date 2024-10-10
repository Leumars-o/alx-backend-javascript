const express = require('express');

const app = express();
const port = 1235;

app.get('/', (_, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
