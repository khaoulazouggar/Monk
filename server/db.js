const mysql = require("mysql");
try {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Monk",
  });
  module.exports = db;
} catch (error) {
  console.log(error);
}
