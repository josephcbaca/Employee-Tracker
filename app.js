// Dependencies
const connection = require("./app/config/connection.js");
const inquirer = require("inquirer");
const CFonts = require('cfonts');
const cTable = require('console.table');

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runProgram();
});

CFonts.say('EMPLOYEES AND MORE!', {
    font: 'block',
    align: 'left',
    gradient: 'black,white'
});

function runProgram() {
    inquirer.prompt({

        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            // "Add Employee",
            // // What is the employee's firstname?
            // // What is the employee's last name?
            // // What is the employee's role?(Choose from already entered role)
            // // Who is the employee's manager?
            // "Remove Employee",
            // // (Choose employee)
            // "Update Employee Role",
            // "Update Employee Manager"
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case "View All Employees":
                employeeSearch();
                break;

            case "View All Employees By Department":
                employeesByDepartment();
                break;

            case "View All Employees By Manager":
                employeesByManager();
                break;
        };
    });
};

function employeeSearch() {
    let query = "SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, departments.department_name, roles.title, roles.salary FROM employees ";
    query += "INNER JOIN departments ON employees.department_id = departments.department_id "
    query += "INNER JOIN roles ON employees.role_id = roles.role_id"
    connection.query(query, function (err, res) {
        let values = [];

// manager_id should read employee_id column to return Manager Name(res[i].first_name + " " + res[i].last_name) 
        for (let i = 0; i < res.length; i++) {
            let managerId = res[i].manager_id;
            let managerName = managerId
            values.push({
                id: res[i].employee_id,
                Name: res[i].first_name + " " + res[i].last_name,
                Role: res[i].title,
                Manager: managerId,
                Department: res[i].department_name,
                Salary: res[i].salary
            })
        };
        console.table([""], values);
        runProgram();
    });
};

function employeesByManager() {
    let query = "SELECT * FROM employees WHERE ?";
    connection.query(query, function (err, res) {

        console.table(res)

        runProgram();
    })
};

