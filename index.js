const inquirer = require('inquirer');
const mysql = require('mysql2');
// allows to display data in a table format
const { printTable } = require('console-table-printer');
// Making connection from db
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
// initiate a connection to the database by passing in connection parameters
db.connect(() => {
    mainMenu();
});
// Back to main menu function
function confirmReturnToMainMenu() {
    return inquirer.prompt({
        type: 'confirm',
        name: 'confirmation',
        message: 'return to the main menu?',
        default: true 
    });
}
// function for display MAIN MENU and take user input in terminal 
function mainMenu() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'menu',
                choices: [
                'view all departments', 
                'view all roles', 
                'view all employees', 
                'add a department', 
                'add a role', 
                'add an employee', 
                'update an employee role',
                'delete a department', 
                'exit']
            },
        ])
        .then(data => {
            if (data.menu === 'view all departments') {
                // call function for view all departments
                viewDepartments();
            }
            else if (data.menu === 'view all employees') {
                // call function for view all Employees
                viewEmployees();
            }
            else if (data.menu === 'view all roles') {
                // call function for view all roles
                viewRoles();
            }
            else if (data.menu === 'add a department') {
                // call function for add a department
                addDepartment();
            }
            else if (data.menu === 'add a role') {
                // call function for add a role
                addRole();
            }
            else if (data.menu === 'add an employee') {
                // call function for add a employee
                addEmploee();
            }
            else if (data.menu === 'update an employee role') {
                // call function for update a employee role
                updateEmployeeRole();
            }
            else if (data.menu === 'delete a department') {
                // call function for update a employee role
                deleteDepartment();
            }
            else if (data.menu === 'exit') {
                exitApp();
            }
        })
};
// function for view all departments
function viewDepartments() {
    // executes a SQL query to retrieve all records from the department table in the database 
    // using the query method provided by the db object
    db.query(`SELECT * FROM department`, (err, data) => {
        // This is the callback function that handles the result of the query
        // If there's an error during the query execution, it might be captured in the err parameter. 
        // Otherwise, if the query is successful, data contains the retrieved records.
        printTable(data);
        confirmReturnToMainMenu().then(answer => {
            if (answer.confirmation) {
                // User confirmed, go back to the main menu
                mainMenu();
            } else {
                viewDepartments();
            }
        });
    })
};
function viewEmployees() {
    db.query(`
    SELECT employee.id, employee.first_name, employee.last_name, title, name department_name, salary, CONCAT(m.first_name, ' ' ,m.last_name) manager
    FROM employee 
    LEFT JOIN role on employee.role_id = role.id
    LEFT JOIN department on role.department_id = department.id
    LEFT JOIN employee m on employee.manager_id = m.id`, (err, data) => {
        printTable(data);
        // Back to main menu option
        confirmReturnToMainMenu().then(answer => {
            if (answer.confirmation) {
                // User confirmed, go back to the main menu
                mainMenu();
            } else {
                viewEmployees();
            }
        });
    })
};

function viewRoles() {
    db.query(`
    SELECT role.id, title, salary, name department_name
    FROM role LEFT JOIN department on role.department_id = department.id`, (err, data) => {
        printTable(data);
        confirmReturnToMainMenu().then(answer => {
            if (answer.confirmation) {
                // User confirmed, go back to the main menu
                mainMenu();
            } else {
                viewRoles();
            }
        });
    })
};

function addDepartment() {
    // Use user input
    inquirer.prompt({
        type: 'input',
        message: 'enter new department',
        name: 'name',
    })
        .then(data => {
            // This handles the user's response once they input the new department name. 
            // The user's input is captured in the data object

            // db.query(): This method is used to execute SQL queries against the connected database. It usually takes several parameters:
            // The first parameter is the SQL query string to be executed.
            // The second parameter is an array containing values to be inserted into the query. These values replace placeholders (in this case, the ? in the query string). [data.name] contains the user-provided department name to be inserted.
            // The third parameter is a callback function that will be executed after the query is performed. This function usually takes an err parameter to handle any errors that might occur during the query execution.
            db.query('INSERT INTO department(name) VALUES (?)', [data.name], (err) => {
                viewDepartments();
            })
        })
};

function addRole() {
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
            db.query('INSERT INTO role(title , salary, department_id) VALUES (?, ?, ?)', [data.title, data.salary, data.department_id], (err) => {
                viewRoles();
            })
        })
}
function addEmploee() {
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
            db.query('INSERT INTO employee(first_name , last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.first_name, data.last_name, data.role_id, data.manager_id], (err) => {
                viewEmployees();
            })
        })
};
function updateEmployeeRole() {
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
            db.query('UPDATE employee SET role_id = ? WHERE id = ?', [data.role_id, data.employee_id], (err) => {
                viewEmployees();
            })
        })
};
// function for view all departments
function deleteDepartment() {



    db.query(`SELECT * FROM department`, (err, data) => {
        // This is the callback function that handles the result of the query
        // If there's an error during the query execution, it might be captured in the err parameter. 
        // Otherwise, if the query is successful, data contains the retrieved records.
        printTable(data);
    });


let del;
    inquirer.prompt({
        type: 'input',
        message: 'delete department\n',
        name: 'delete',
    })
        .then(data => {
            data.delete = del;
            // This handles the user's response once they input the new department name. 
            // The user's input is captured in the data object

            // db.query(): This method is used to execute SQL queries against the connected database. It usually takes several parameters:
            // The first parameter is the SQL query string to be executed.
            // The second parameter is an array containing values to be inserted into the query. These values replace placeholders (in this case, the ? in the query string). [data.name] contains the user-provided department name to be inserted.
            // The third parameter is a callback function that will be executed after the query is performed. This function usually takes an err parameter to handle any errors that might occur during the query execution.
            db.query('DELETE FROM department WHERE id = ?', del, (err, data) => {
                printTable(data);
            })
        })
};
function exitApp() {
    console.log("Exiting the application...");
    process.exit(0); // 0 indicates a successful exit, while other values can indicate an error or specific exit status
}