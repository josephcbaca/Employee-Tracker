const mysql = require("mysql");
require('dotenv').config({ path: "/Users/josep/dev/AdditionalFiles/.env" });

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "company_employeesdb"
});



module.exports = connection;