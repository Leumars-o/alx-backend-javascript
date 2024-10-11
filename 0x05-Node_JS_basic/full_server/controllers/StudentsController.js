import readDatabase from '../utils';

const VALID_MAJORS = ['CS', 'SWE'];

class StudentsController {
  static getAllStudents(req, res) {
    const path = process.argv.length > 2 ? process.argv[2] : '';

    readDatabase(path)
      .then((groups) => {
        const responseStr = ['This is the list of our students'];

        // comaprison function that sorts students by major and then by last name
        const cmpFxn = (a, b) => {
          if (a[0].toLowerCase() < b[0].toLowerCase()) {
            return -1;
          }
          if (a[0].toLowerCase() > b[0].toLowerCase()) {
            return 1;
          }
          return 0;
        };

        for (const [field, students] of Object.entries(groups).sort(cmpFxn)) {
          responseStr.push(`Number of students in ${field}: ${students.length}. List: ${students.map((student) => student.firstname).join(', ')}`);
        }
        res.status(200).send(responseStr.join('\n'));
      })
      .catch((err) => {
        res
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }

  static getAllStudentsByMajor(req, res) {
    const path = process.argv.length > 2 ? process.argv[2] : '';
    const { major } = req.params;

    if (!VALID_MAJORS.includes(major)) {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }
    readDatabase(path)
      .then((groups) => {
        let responseText = '';

        if (Object.keys(groups).includes(major)) {
          const studentNames = groups[major].map((student) => student.firstname);
          responseText = `List: ${studentNames.join(', ')}`;
        }
        res.status(200).send(responseText);
      })
      .catch((err) => {
        res
          .status(500)
          .send(err instanceof Error ? err.message : err.toString());
      });
  }
}

export default StudentsController;
module.exports = StudentsController;
