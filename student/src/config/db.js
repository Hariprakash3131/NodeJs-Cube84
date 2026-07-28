const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "harip3131@", // change your mysql password
    database: "college"
});

module.exports = pool;