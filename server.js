let mysql = require("mysql");
let express = require("express");
require('dotenv').config({ path: "/Users/josep/dev/AdditionalFiles/.env" });

let PORT = process.env.PORT || 8080;

let app = express();

let connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASS,
  database: "playlist_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });