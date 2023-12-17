INSERT INTO department(name) VALUES 
    ("Financial Strategy & Planning Department"),
    ("Quality Assurance & Compliance Division"),
    ("Marketing & Communications Unit"),
    ("Technology & Information Services Team"),
    ("Sustainability & Corporate Responsibility Department");

INSERT INTO role (title, salary, department_id)
VALUES ("Senior Marketing Analyst", 5400.60 , 1),
       ("Operations Coordinator", 4500.50, 3),
       ("Software Engineer", 6900.90, 5),
       ("Human Resources Specialist", 4000.50, 4),
       ("Sales Associate", 4500.30, 2);


INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Emily", "Johnson", 1),
       ("Marcus", "Rodriguez", 3),
       ("Ava", "Patel", 2),
       ("Jackson", "Nguyen",4),
       ("Sofia", "Gonzalez", 5);

UPDATE employee SET  manager_id = 3 WHERE id = 1 OR id = 2;


