import fs from 'fs';

const readDatabase = (path) => new Promise((resovle, reject) => {
  if (!path) {
    reject(new Error('Cannot load the database'));
  }
  if (path) {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(new Error('Error reading file'));
      }
      if (data) {
        const lines = data
          .toString('utf-8')
          .trim()
          .split('\n');

        const groups = {};
        const dbFieldNames = lines[0].split(',');
        const studentNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of lines.slice(1)) {
          const record = line.split(',');
          const studentValues = record.slice(0, record.length - 1);
          const field = record[record.length - 1];

          if (!Object.keys(groups).includes(field)) {
            groups[field] = [];
          }
          const entries = studentNames
            .map((propName, index) => [propName, studentValues[index]]);
          groups[field].push(Object.fromEntries(entries));
        }
        resovle(groups);
      }
    });
  }
});

export default readDatabase;
module.exports = readDatabase;
