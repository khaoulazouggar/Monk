const mysql = require("mysql");
try {
  const db = mysql.createConnection({
    host: "192.168.99.100",
    user: "root",
    password: "root",
    database: "Monk",
  });
  module.exports = db;
} catch (error) {
  console.log(error);
}
