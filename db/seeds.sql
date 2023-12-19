-- Add defaul data for department table
INSERT INTO department(name) VALUES 
    ("Financial Strategy & Planning Department"),
    ("Quality Assurance & Compliance Division"),
    ("Marketing & Communications Unit"),
    ("Technology & Information Services Team"),
    ("Sustainability & Corporate Responsibility Department");
-- Add defaul data for role table
INSERT INTO role (title, salary, department_id)
VALUES ("Senior Marketing Analyst", 5400.60 , 1),
       ("Operations Coordinator", 4500.50, 3),
       ("Software Engineer", 6900.90, 5),
       ("Human Resources Specialist", 4000.50, 4),
       ("Sales Associate", 4500.30, 2);
-- Add defaul data for employee table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Emily", "Johnson", 1),
       ("Marcus", "Rodriguez", 3),
       ("Ava", "Patel", 2),
       ("Jackson", "Nguyen",4),
       ("Sofia", "Gonzalez", 5);
-- UPDATE employee table. Set the manager_id for employees with id equal to 1 or 2 to the value of 3.
UPDATE employee SET  manager_id = 3 WHERE id = 1 OR id = 2;


