let mysql = require("mysql");
let express = require("express");
require('dotenv').config({ path: "/Users/josep/dev/AdditionalFiles/.env" });
const inquirer = require("inquirer");

let PORT = process.env.PORT || 8080;

let app = express();

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "character"
});

const questions = [
  {
    type: "list",
    name: "questions",
    message: "Choose the badge you wish to attach to your Read Me.",
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
  },
];

function promptUser(incoming) {
  return inquirer.prompt(incoming);
};

async function init() {
  try {

    console.log("What would you like to do?");
    
    const data = promptUser(questions);
console.log(data)
    module.exports = data

  } catch (err) {
    console.log(err);
  }
}

init();

// Connection to MySQL database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});