const mysql = require("mysql2");

module.exports = mysql.createConnection({
  host: "localhost",
  user: "oyh",
  password: "dkssud12",
  database: "SampleApp",
});
