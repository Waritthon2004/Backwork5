import express from "express";
import { conn } from "../dbconnent";
import mysql from "mysql";
//router = ตัวจัดการเส้นทาง
export const router = express.Router();

// /Person
router.get("/", (req, res) => {
  const sql = "Select * from Person_R";
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});


router.post("/", (req, res) => {

    const data  = req.body;

    
    let sql =  "INSERT INTO `Person_R`(`Name`,`Image`, `detail`) VALUES (?,?,?)";
    sql = mysql.format(sql,[
        data.name,
        data.img,
        data.detail
    ]);
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({Idx : result.insertId});
      }
    });
  });


  router.delete("/", (req, res) => {

    const data  = req.query.PID;
    console.log(data);
    
    let sql =  "DELETE FROM Person_R WHERE `PID` = ?";
    sql = mysql.format(sql,[
      data
    ]);
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(result);
      }
    });
  });