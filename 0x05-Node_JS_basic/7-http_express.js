const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const dbFile = process.argv.length > 2 ? process.argv[2] : '';

const countStudents = (path) => new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('Missing database file'));
  }
  if (path) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const report = [];
        const lines = data.toString('utf-8').trim().split('\n');
        const groups = {};
        const fields = lines[0].split(',');
        const studentNames = fields.slice(0, fields.length - 1);

        for (const line of lines.slice(1)) {
          const record = line.split(',');
          const values = record.slice(0, record.length - 1);
          const field = record[record.length - 1];
          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const entries = studentNames.map((propName, index) => [
            propName,
            values[index],
          ]);
          groups[field].push(Object.fromEntries(entries));
        }

        const totalStudents = Object.values(groups)
          .reduce((acc, group) => (acc || []).length + group.length);
        report.push(`Number of students: ${totalStudents}`);

        for (const [field, group] of Object.entries(groups)) {
          report.push([`Number of students in ${field}: ${group.length}. List: ${group.map((student) => student.firstname).join(', ')}`].join());
        }
        resolve(report.join('\n'));
      }
    });
  }
});

app.get('/', (_, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (_, res) => {
  const response = ['This is the list of our students'];

  countStudents(dbFile)
    .then((report) => {
      response.push(report);
      const responseStr = response.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseStr.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseStr));
    })
    .catch((err) => {
      response.push(err instanceof Error ? err.message : err.toString());
      const responseStr = response.join('\n');
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', responseStr.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseStr));
    });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
