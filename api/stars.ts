import express from "express";
import { conn } from "../dbconnent";
import mysql from "mysql";

export const router = express.Router();

// /movie
router.get("/", (req, res) => {
  const sql =
    "Select Movie_R.Name as Movie_name, Person_R.Name as Person_name from Stars_R ,Movie_R,Person_R where SMID = MID and SPID = PID";
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/:name", (req, res) => {
  let responseData = {
    persons: [],
    movies: []
  };

  let sql = `SELECT Person_R.* FROM Person_R WHERE PID IN (
    SELECT Stars_R.SPID FROM Stars_R
    INNER JOIN Movie_R ON Stars_R.SMID = Movie_R.MID
    WHERE Movie_R.Name LIKE ?

    UNION

    SELECT creators_R.CPID FROM creators_R
    INNER JOIN Movie_R ON creators_R.CMID = Movie_R.MID
    WHERE Movie_R.Name LIKE ?
)`;
  sql = mysql.format(sql, [`%${req.params.name}%`, `%${req.params.name}%`]); // Use the same parameter twice
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      responseData.persons = result;
      checkAndSendResponse();
    }
  });

  let sql1 = `SELECT distinct * FROM Movie_R WHERE Name LIKE ?`;
  sql1 = mysql.format(sql1, [`%${req.params.name}%`]);
  conn.query(sql1, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      responseData.movies = result;
      checkAndSendResponse();
    }
  });

  function checkAndSendResponse() {
    if (responseData.persons.length > 0 && responseData.movies.length > 0) {
      res.json(responseData);
    }
  }
});
