import express from "express";
import { conn } from "../dbconnent";
import mysql from "mysql";
import { Movie } from "../model/modelMovie";
//router = ตัวจัดการเส้นทาง
export const router = express.Router();

// /movie

router.get("/", (req, res) => {
    const sql = "Select * from Movie_R";
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json((result))
      }
    });
  });

// router.get("/type", (req, res) => {
//   const sql = "Select type from Movie_R";
//   conn.query(sql, (err, result) => {
//     if (err) {
//       res.status(400).json(err);
//     } else {
//       res.json(JSON.parse(result.type))
//     }
//   });
// });


router.post("/", (req, res) => {
    const data : Movie = req.body;
    console.log(data);
    
    let sql = "INSERT INTO `Movie_R`(`Name`, `Image`, `Type`, `detail`, `rating`, `day`, `head`) VALUES (?,?,?,?,?,?,?)";
    sql = mysql.format(sql, [
        data.name,
        data.img,
        JSON.stringify(data.type),// Convert the Type array to a JSON string
        data.detail,
        data.rating,
        data.day,
        data.head
    ]);
    conn.query(sql, (err, result) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.json({ Idx: result.insertId });
        }
    });
});



  router.delete("/", (req, res) => {

    const data  = req.query.MID;
    console.log(data);
    
    let sql =  "DELETE FROM Movie_R WHERE `MID` = ?";
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