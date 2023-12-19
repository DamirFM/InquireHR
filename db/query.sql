-- Show all information from department table
SELECT * FROM department;



-- JOIN role and department tables
-- Show {only id, title, salary} from role table
-- Show {name} from department table (name department_name) => changing the alias for name property by making SPACE
SELECT role.id, title, salary, name department_name
-- left table role
FROM role 
-- right table department 
-- use FOREIGN KEY pair (role.department_id = department.id) 
LEFT JOIN department on role.department_id = department.id;


-- JOIN role and department tables
-- Show {employee.id, employee.first_name, employee.last_name} from employee table
-- Show {title, salary} from role table 
-- Show {name} from department table (name department_name) => changing the alias for name property by making SPACE
-- CONCAT(m.first_name, ' ' ,m.last_name) manager => This part concatenates the first name and last name of the manager using CONCAT() function and creates an alias manager. 
-- It involves a self-join on the employee table (m being an alias for another instance of the employee table) to retrieve the manager's name based on the manager_id.
SELECT employee.id, employee.first_name, employee.last_name, title, name department_name, salary, CONCAT(m.first_name, ' ' ,m.last_name) manager
-- specifies that the query will retrieve data from the employee table.
FROM employee 
-- order of doing JOIN matters
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id
-- This performs a self-join on the employee table to link an employee
-- with their manager using the manager_id column.
LEFT JOIN employee m on employee.manager_id = m.id;
