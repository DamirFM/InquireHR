SELECT * FROM department;

SELECT role.id, title, salary, name department_name
FROM role LEFT JOIN department on role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, title, name department_name, salary, CONCAT(m.first_name, ' ' ,m.last_name) manager
FROM employee 
LEFT JOIN role on employee.role_id = role.id
LEFT JOIN department on role.department_id = department.id
LEFT JOIN employee m on employee.manager_id = m.id;
