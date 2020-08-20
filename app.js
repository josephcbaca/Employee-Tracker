// Dependencies
const connection = require("./app/config/connection.js");
const inquirer = require("inquirer");
const CFonts = require('cfonts');
const cTable = require('console.table');

// Connection to SQL database
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runProgram();
});

// npm CFonts for decorative header
CFonts.say('EMPLOYEES AND MORE!', {
    font: 'block',
    align: 'left',
    gradient: 'black,white'
});

// Initialize first set of prompts
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
                managerList()

                break;

            case "View All Employees By Manager":
                employeesByManager();
                break;
        };
    });
};

// View all employees
function employeeSearch() {
    let query = "SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, departments.department_name, roles.title, roles.salary FROM employees ";
    query += "INNER JOIN departments ON employees.department_id = departments.department_id "
    query += "INNER JOIN roles ON employees.role_id = roles.role_id "
    // query += "CONCAT(first_name, ' ',last_name) AS manager_name FROM employees WHERE employee_id IN (SELECT DISTINCT manager_id FROM employees)"
    connection.query(query, function (err, res) {
        let employeeObject = [];

        // console.log(res)
        // manager_id should read employee_id column to return Manager Name(res[i].first_name + " " + res[i].last_name) 
        for (let i = 0; i < res.length; i++) {
            // let managerId = res[i].manager_id;
            let managerName = "";
            console.log(res)

            if (res[i].manager_id === res[i].employee_id) {
                managerName = res[i].first_name + " " + res[i].last_name
            }

            console.log(managerName)
            // else {
            //     managerName = "No Manager"
            // }
            employeeObject.push({
                id: res[i].employee_id,
                Name: res[i].first_name + " " + res[i].last_name,
                Role: res[i].title,
                Manager: managerName,
                Department: res[i].department_name,
                Salary: "$" + res[i].salary
            })
        };

        console.table([""], employeeObject);
        runProgram();
    });
};

let viewDepartment = [];

function managerList() {
    let query = "SELECT * FROM departments"
    connection.query(query, function (err, res) {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
            viewDepartment.push(res[i].department_name)
        };
        employeesByDepartment();
    });
};

// View employees by manager
function employeesByDepartment() {

    inquirer
        .prompt({
            name: "byDepartment",
            type: "list",
            message: "What department would you like to view?",
            choices: viewDepartment
        })
        .then(function (answer) {
            console.log(answer)
            let query = "SELECT employees.employee_id, employees.first_name, employees.last_name, employees.manager_id, departments.department_name, roles.title, roles.salary FROM employees ";
            query += "INNER JOIN departments ON employees.department_id = departments.department_id "
            query += "INNER JOIN roles ON employees.role_id = roles.role_id"
            query += "WHERE department_name = ?"
            connection.query(query, { department: answer.department }, function (err, res) {

                let employeeObject = [];

                // manager_id should read employee_id column to return Manager Name(res[i].first_name + " " + res[i].last_name) 
                for (let i = 0; i < res.length; i++) {
                    let managerId = res[i].manager_id;
                    // let managerName = managerId
                    employeeObject.push({
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

                runProgram();
            })
        });
}
