DROP DATABASE IF EXISTS employeeDB;
CREATE database employeeDB;

USE employeeDB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  PRIMARY KEY (id),
  department_id INT NULL, 
  FOREIGN KEY (department_id) 
        REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  PRIMARY KEY (id),
  role_id INT NULL, 
  FOREIGN KEY (role_id) 
        REFERENCES roles(id),
  manager_id INT NULL, 
  FOREIGN KEY (manager_id) 
        REFERENCES employees(id) 
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees; 




