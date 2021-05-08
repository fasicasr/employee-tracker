const mysql = require('mysql');
const inquirer = require('inquirer');
//require('console.table');
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,
  //username
  user: 'root',
  //passoword
  password: '',
  database: 'employeeDB',
});

connection.connect((err) => {
  if (err) throw err;
  //viewEmployees()
  runSearch();
});

const runSearch = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'Please choose from the items below',
      choices: [
        'View employees',
        'Add employee',
        'View roles',
        'Add role',
        'Add department',
        'View departments',
        'Update employee role',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'Add department':
          addDepartment();
          break;

        case 'Add role':
          addRole();
          break;

        case 'Add employee':
          addEmployee();
          break;

        case 'View departments':
          viewDepartments();
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
      message: 'What is the name of the department you would like to add?',
    })
    .then((answer) => {
      const query = connection.query(
        'INSERT INTO departments SET ?',
        {
          name: answer.departmentName,

        },
        (err, res) => {
          if (err) throw err;
          console.log(answer.departmentName)
          console.log(err)

          runSearch();
        });


    });
};




const addRole = () => {
  const query =
    'SELECT id, name FROM departments';
  connection.query(query, (err, res) => {
    res.forEach(({ id, name }) => console.log(id + ' ' + name));

    inquirer
      .prompt([
        {
          name: 'roleTitle',
          type: 'input',
          message: 'What is the title of the role?',
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the salary amount for this role?',
        },
        {
          name: 'departmentId',
          type: 'input',
          message: 'What is the department ID for this role?',

        },
      ])
      .then((answer) => {
        const query = connection.query(
          'INSERT INTO roles SET ?',
          {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentId
          },
          (err, res) => {
            if (err) throw err;
            console.log(err)

            runSearch();
          });
      });
  });
  // })
  // .catch(err => {
  //   console.error(err)
  // })

};



const addEmployee = () => {

  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the employees first name?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the employees last name?',
      },
      {
        name: 'roleId',
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
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.roleId,
          manager_id: answer.managerId

        },
        (err, res) => {
          if (err) throw err;
          console.log(err)

          runSearch();
        });
    });
};



const viewDepartments = () => {
  const query =
    'SELECT id, name FROM departments';
  connection.query(query, (err, res) => {
    res.forEach(({ id, name }) => console.log(id + ' ' + name));
  });
  runSearch();
};

const viewRoles = () => {
  const query =
    'SELECT id, title, salary FROM roles';
  connection.query(query, (err, res) => {
    res.forEach(({ id, title, salary }) => console.table(id + ' ' + title + ' ' + salary));
  });
  runSearch();
};

const viewEmployees = () => {
  //need to display id, first, last, title, department, salary, manager
  const query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary, m.first_name as manager 
      FROM employees e  
      inner JOIN roles r ON e.role_id = r.id
      inner JOIN departments d ON r.department_id = d.id
      left JOIN employees m ON e.manager_id = m.id;`
  //TODO: add manger_id (m.first_name + m.last_name) as manager
  connection.query(query, (err, res) => {
    let values = [];
    res.forEach(({ id, first_name, last_name, title, department, salary, manager  }) => values.push([id, first_name, last_name, title, department, salary, manager]));
    // var values = [
    //   [1, 'sally', 'huey', 'Sales Manger'],
    //   [2, 'sally', 'huey', 'Sales Manger']
    // ]; 
    console.log('\n \n')
    console.table(['id', 'first_name', 'last_name', 'title', 'department', 'salary'], values);
  });
  runSearch();
};

const updateRole = () => {
  const query =
    'SELECT name FROM roles';
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
