const inquirer = require('inquirer');
const mysql = require('mysql2');
// pop data in table format
const {printTable} = require('console-table-printer')
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'password',
      database: 'manage_db'
    },
    console.log(`Connected to the manage_db database.`)
  );

db.connect(()=> {
    mainMenu();
})
function mainMenu () {


inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'menu',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        },
    ])
    .then(data => {
        if (data.menu === 'view all departments') {
            viewDepartments();
        }
        else if (data.menu === 'view all employees' ) {
            viewEmployees ();
        }
        else if (data.menu === 'view all roles' ) {
            viewRoles ();
        } 
        else if (data.menu === 'add a department' ) {
            addDepartment ();
        }
        else if (data.menu === 'add a role') {
            addRole ();
        }
        else if (data.menu === 'add an employee') {
            addEmploee ();
        }
        else if (data.menu === 'update an employee role') {
            updateEmployeeRole ();
        }

    }) 
}
function viewDepartments () {
db.query(`SELECT * FROM department`, (err, data)=> {
    printTable(data);
    mainMenu();
})
}; 
function viewEmployees () {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, title, name department_name, salary, CONCAT(m.first_name, ' ' ,m.last_name) manager
    FROM employee 
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee m on employee.manager_id = m.id`, (err, data)=> {
        printTable(data);
        mainMenu();
    })
    };

    function viewRoles () {
        db.query(`SELECT role.id, title, salary, name department_name
        FROM role LEFT JOIN department on role.department_id = department.id`, (err, data)=> {
            printTable(data);
            mainMenu();
        })
        }; 

function addDepartment () {
    inquirer.prompt({
        type: 'input',
        message: 'enter new department',
        name: 'name',
    })
    .then(data => {
        db.query('INSERT INTO department(name) VALUES (?)', [data.name], (err)=> {
            viewDepartments();
        })
    })
};

function addRole () {
    inquirer.prompt([{
        type: 'input',
        message: 'enter new role',
        name: 'title',
    },
{
    type: 'input',
    message: 'enter new salary',
    name: 'salary',
},
{
    type: 'input',
    message: 'enter department id',
    name: 'department_id',
}
])
    .then(data => {
        db.query('INSERT INTO role(title , salary, department_id) VALUES (?, ?, ?)', [data.title, data.salary, data.department_id], (err)=> {
            viewRoles();
        })
    })
}
function addEmploee () {
    inquirer.prompt([{
        type: 'input',
        message: 'enter new first name',
        name: 'first_name',
    },
{
    type: 'input',
    message: 'enter new last name',
    name: 'last_name',
},
{
    type: 'input',
    message: 'enter role id',
    name: 'role_id',
},
{
    type: 'input',
    message: 'enter manager id',
    name: 'manager_id',
}])
.then(data => {
    db.query('INSERT INTO employee(first_name , last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.first_name , data.last_name, data.role_id, data.manager_id], (err)=> {
        viewEmployees();
    })
})
};
function  updateEmployeeRole () {
    inquirer.prompt([
        {
        type: 'input',
        message: 'enter emp role id',
        name: 'role_id',
    },
{
    type: 'input',
    message: 'enter exist emp id',
    name: 'employee_id',
}])
.then(data => {
    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.role_id , data.employee_id], (err)=> {
        viewEmployees();
    })
})
};
