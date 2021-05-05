DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  PRIMARY KEY (id),
  department_id INT NULL, 
  FOREIGN KEY (department_id) 
        REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  PRIMARY KEY (id)
  role_id INT NULL, 
  FOREIGN KEY (role_id) 
        REFERENCES role(id),
  manager_id INT NULL, 
  FOREIGN KEY (manager_id) 
        REFERENCES employee(id), 
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee; 



