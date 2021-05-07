const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: '',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'Add department',
        'Add roles',
        'Add employees',
        'View departments',
        'View roles',
        'View employees',
        'Update employee role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add department':
          addDepartment();
          break;

        case 'Add roles':
          addRole();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'View department':
          viewDepartment();
          break;

        case 'View roles':
          viewRoles();
          break;

        case 'View employees':
          viewEmployees();
          break;

        case 'Update employee role':
          updateRole();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: 'departmentName',
      type: 'input',
      message: 'What department would you like to add?',
    })
    .then((answer) => {
      const query = 'INSERT INTO department (name) VALUE (?)';
      connection.query(query, { departmentName: answer.departmentName }, (err, res) => {
        // connection.query(query, (err, res) => {
        //   res.forEach(({ departmentName }) => console.log(departmentName));
        // });
        runSearch();
      });
    });
};



const addRole = () => {
  
  inquirer
    .prompt([
      {
        name: 'roleTitle',
        type: 'input',
        message: 'What is the title of the role?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary amount for this role?',
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'What is the department ID for this role?',
        validate(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO auctions SET ?',

    )});
};



const addEmployee = () => {
  
  inquirer
    .prompt([
      {
        name: 'employeeFirstName',
        type: 'input',
        message: 'What is the employees first name?',
      },
      {
        name: 'employeeLastName',
        type: 'input',
        message: 'What is the employees last name?',
      },
      {
        name: 'employeeRoleId',
        type: 'input',
        message: 'What is the department ID for this role?',
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'What is the manager id?',
      },
    ])
    .then((answer) => {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        'INSERT INTO auctions SET ?',

    )});
};

const viewDepartment = () => {
  const query =
    'SELECT name FROM department';
  connection.query(query, (err, res) => {
    res.forEach(({ name }) => console.log(name));
  });
  runSearch();
};

const viewRoles = () => {
  const query =
    'SELECT name FROM roles';
  connection.query(query, (err, res) => {
    res.forEach(({ name }) => console.log(name));
  });
  runSearch();
};

const viewEmployees = () => {
  const query =
    'SELECT name FROM employee';
  connection.query(query, (err, res) => {
    res.forEach(({ name }) => console.log(name));
  });
  runSearch();
};

const updateRole = () => {
  const query =
    'SELECT name FROM role';
  connection.query(query, (err, res) => {
    res.forEach(({ name }) => console.log(name));
  });
  runSearch();
};




















// const rangeSearch = () => {
//   inquirer
//     .prompt([
//       {
//         name: 'start',
//         type: 'input',
//         message: 'Enter starting position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//       {
//         name: 'end',
//         type: 'input',
//         message: 'Enter ending position: ',
//         validate(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         },
//       },
//     ])
//     .then((answer) => {
//       const query =
//         'SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?';
//       connection.query(query, [answer.start, answer.end], (err, res) => {
//         res.forEach(({ position, song, artist, year }) => {
//           console.log(
//             `Position: ${position} || Song: ${song} || Artist: ${artist} || Year: ${year}`
//           );
//         });
//         runSearch();
//       });
//     });
// };

// const songSearch = () => {
//   inquirer
//     .prompt({
//       name: 'song',
//       type: 'input',
//       message: 'What song would you like to look for?',
//     })
//     .then((answer) => {
//       console.log(answer.song);
//       connection.query(
//         'SELECT * FROM top5000 WHERE ?',
//         { song: answer.song },
//         (err, res) => {
//           if (res[0]) {
//             console.log(
//               `Position: ${res[0].position} || Song: ${res[0].song} || Artist: ${res[0].artist} || Year: ${res[0].year}`
//             );
//           } else {
//             console.error(`No results for ${answer.song}`);
//           }
//           runSearch();
//         }
//       );
//     });
// };

// const songAndAlbumSearch = () => {
//   inquirer
//     .prompt({
//       name: 'artist',
//       type: 'input',
//       message: 'What artist would you like to search for?',
//     })
//     .then((answer) => {
//       let query =
//         'SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ';
//       query +=
//         'FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ';
//       query +=
//         '= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position';

//       connection.query(query, [answer.artist, answer.artist], (err, res) => {
//         console.log(`${res.length} matches found!`);
//         res.forEach(({ year, position, artist, song, album }, i) => {
//           const num = i + 1;
//           console.log(
//             `${num} Year: ${year} Position: ${position} || Artist: ${artist} || Song: ${song} || Album: ${album}`
//           );
//         });

//         runSearch();
//       });
//     });
// };
