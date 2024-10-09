// Reading files synchronously

const fs = require('node:fs');

function countStudents(path) {
  try {
    // Read file sycnhronously
    const data = fs.readFileSync(path, { encoding: 'utf8' });

    // Split the file by new line character
    const students = data.split('\n').filter((student) => student.trim() !== '');

    // Remove first line
    students.shift();

    // initialize variables for counting students
    const studentCount = students.length;
    const studentFields = {};

    // Count the number of students in the file
    students.forEach((student) => {
      const [firstname, , , field] = student.split(',');

      if (!studentFields[field]) {
        studentFields[field] = [];
      }
      studentFields[field].push(firstname);
    });

    // print the number of students to stdout
    console.log(`Number of students: ${studentCount}`);

    // print the number of students per field to stdout
    for (const field in studentFields) {
      if (Object.prototype.hasOwnProperty.call(studentFields, field)) {
        console.log(`Number of students in ${field}: ${studentFields[field].length}. List: ${studentFields[field].join(', ')}`);
      }
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
