const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 10,
});

// connection.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connectie succesvol");
//   }
// });

// connection.end();

module.exports = pool;

// connection.end();
