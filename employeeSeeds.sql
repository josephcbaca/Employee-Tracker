DROP DATABASE IF EXISTS company_employeesdb;
CREATE database company_employeesdb;

USE company_employeesdb;

CREATE TABLE employees (
  employee_id INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  department_id INT NULL,
  PRIMARY KEY (employee_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (department_id)
);

CREATE TABLE roles (
  role_id INT NOT NULL,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  PRIMARY KEY (role_id)
);

-- Test data --
INSERT INTO departments (department_id, department_name)
VALUES
(0, "Store"),
(1, "BP"),
(2, "Men's Sportswear"),
(3, "Shoes"),
(4, "Cosmetics");

-- 
INSERT INTO roles (role_id, title, salary)
VALUES 
(000, "Store Manager", 100000.00),
(100, "Sales", 60000.00),
(200, "Manager", 70000.00),
(300, "Buyer", 80000.00);

INSERT INTO employees (employee_id, first_name, last_name, role_id, manager_id, department_id)
VALUES
(1000, "Shaun", "Aleman", 000, null, 0),
(1001, "Amanda", "Bough", 300, 1000, 1),
(1002, "Adam", "Wallraff", 100, 1001, 4);

-- USE company_employeesdb;
-- SELECT employees.employee_id, employees.first_name, employees.last_name, departments.department_name, roles.title, roles.salary  FROM employees
-- INNER JOIN departments ON employees.department_id = departments.department_id
-- INNER JOIN roles ON employees.role_id = roles.role_id