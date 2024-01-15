const express = require("express");
const router = express.Router();

const dbPool = require("../config/db/db");

/* GET home page. */
router.get("/", function (req, res, next) {
  dbPool.getConnection((err, conn) => {
    if (err) {
      res.status(500).send("Er is een fout opgetreden!");
    } else {
      conn.query("SELECT 2 + 3 AS solution", (err, result, rows) => {
        if (err) {
          res.status(500).send("Er is een fout gebeurd met de connectie.");
        } else {
          res.status(200).json(result);
        }
      });
      conn.release();
    }
  });

  // dbConnection.query("SELECT 1 + 1 AS solution", (err, result, rows) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send(err);
  //   } else {
  //     res.json(result);
  //   }
  // });
});

module.exports = router;

// Correcte manier
// connection.query("SELECT * FROM todos WHERE id = ?", [id], () => {})

// Foute manier
// Kwetsbaar voor SQL injectie
// Connection.query(`SELECT * FROM todos WHERE id=${id}`, ...);
