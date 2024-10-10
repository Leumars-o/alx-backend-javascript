const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (data) {
      const fileLines = data
        .toString('utf-8')
        .trim()
        .split('\n');
      const studentGroups = {};
      const dbFieldNames = fileLines[0].split(',');
      const studentNames = dbFieldNames
        .slice(0, dbFieldNames.length - 1);

      for (const line of fileLines.slice(1)) {
        const studentData = line.split(',');
        const studentValues = studentData.slice(0, studentData.length - 1);
        const group = studentData[studentData.length - 1];

        if (!Object.keys(studentGroups).includes(group)) {
          studentGroups[group] = [];
        }
        const studentEntries = studentNames
          .map((name, idx) => [name, studentValues[idx]]);
        studentGroups[group].push(Object.fromEntries(studentEntries));
      }

      const totalStudents = Object
        .values(studentGroups)
        .reduce((acc, cur) => (acc || []).length + cur.length);
      console.log(`Number of students: ${totalStudents}`);
      for (const [group, students] of Object.entries(studentGroups)) {
        const studentList = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${group}: ${students.length}. List: ${studentList}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
