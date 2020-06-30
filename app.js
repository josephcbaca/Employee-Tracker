// Dependencies
const connection = require("./app/config/connection.js");
const inquirer = require("inquirer");
const showBanner = require('node-banner');

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    runProgram();
});

function runProgram() {
    showBanner('Employees', 'The only Employee Tracker you need.');
    inquirer.prompt({
        type: "rawlist",
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
    let query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
       for (let i = 0; i < res.length; i++) {
           console.log(
            "id: " +
            res[i].employee_id +
            "Employee Name: " +
              res[i].first_name + " " + res[i].last_name +
              " || Role: " +
              res[i].role_id +
              " || Manager: " +
              res[i].manager_id +
              " || Department: " +
              res[i].department_id
          );
       }
       
        console.log(res)
       connection.end(); 
    })
};


