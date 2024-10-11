const http = require('http');
const fs = require('fs');

const HOSTNAME = 'localhost';
const PORT = 1235;
const app = http.createServer();
const dbPath = process.argv.length > 2 ? process.argv[2] : '';

// Async request handler
const countStudents = (dbPath) => new Promise((resolve, reject) => {
  if (!dbPath) {
    reject(new Error('No database path provided'));
  }
  if (dbPath) {
    fs.readFile(dbPath, (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      }
      if (data) {
        const reportParts = [];
        const fileLines = data.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const dbFieldNames = fileLines[0].split(',');
        const studentNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentData = line.split(',');
          const studentValues = studentData.slice(0, studentData.length - 1);
          const group = studentData[studentData.length - 1];
          if (!Object.keys(studentGroups).includes(group)) {
            studentGroups[group] = [];
          }
          const studentEntries = studentNames.map((name, idx) => [name, studentValues[idx]]);
          studentGroups[group].push(Object.fromEntries(studentEntries));
        }

        const totalStudents = Object.values(studentGroups)
          .reduce((acc, cur) => (acc || []).length + cur.length);
        reportParts.push(`Number of students: ${totalStudents}`);
        for (const [group, students] of Object.entries(studentGroups)) {
          reportParts.push(`Number of students in ${group}: ${students.length}. List: ${students.map((student) => student.firstname).join(', ')}`);
          
        }
        resolve(reportParts.join('\n'));
      }
    });
  }
});

const SERVER_ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, res) {
      const response = 'Hello Holberton School!';

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', response.length);
      res.statusCode = 200;
      res.write(Buffer.from(response));
    },
  },

  {
    route: '/students',
    handler(_, res) {
      const studentResponse = ['This is the list of our students'];

      countStudents(dbPath)
        .then((report) => {
          studentResponse.push(report);
          const response = studentResponse.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', response.length);
          res.statusCode = 200;
          res.write(Buffer.from(response));
        })
        .catch((err) => {
          studentResponse.push(err instanceof Error ? err.message : err.toString());
          const response = studentResponse.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', response.length);
          res.statusCode = 200;
          res.write(Buffer.from(response));
        });
    },
  },
];

app.on('request', (req, res) => {
  for (const routeHandler of SERVER_ROUTE_HANDLERS) {
    if (req.url === routeHandler.route) {
      routeHandler.handler(req, res);
      break;
    }
  }
});

app.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server running at http://${HOSTNAME}:${PORT}\n`);
});

module.exports = app;
