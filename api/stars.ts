import express from "express";
import { conn } from "../dbconnent";
import mysql from "mysql";
import { Actor, resMovie, Creaters } from "../model/modelMovie";

export const router = express.Router();

// /movie
router.get("/", (req, res) => {
  const sql =
    "SELECT Movie_R.Name AS Movie_name, Person_R.Name AS Person_name FROM Stars_R, Movie_R, Person_R WHERE SMID = MID AND SPID = PID";
  conn.query(sql, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/:name", async (req, res) => {
  let sql1 = `SELECT DISTINCT * FROM Movie_R WHERE Name LIKE ?`;
  sql1 = mysql.format(sql1, [`%${req.params.name}%`]);
  conn.query(sql1, async (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let Movies: resMovie[] = result.map((movie: any) => {
        return {
          MID: movie.MID,
          Name: movie.Name,
          Image: movie.Image,
          Type: movie.Type,
          detail: movie.detail,
          rating: movie.rating,
          day: movie.day,
          head: movie.head,
          Actor: [],
          Creaters: []
        };
      });

      for (let index = 0; index < Movies.length; index++) {
        console.log(Movies[index].Name);
        let result1: any = await new Promise((resolve, reject) => {
          conn.query(
            "SELECT DISTINCT Person_R.* FROM Movie_R, Stars_R, Person_R WHERE Movie_R.MID = Stars_R.SMID AND Stars_R.SPID = Person_R.PID AND Movie_R.Name LIKE ?",
            ['%' + Movies[index].Name + '%'],
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        });

        let Actor: Actor[] = result1.map((actor: any) => {
          return {
            PID: actor.PID,
            Name: actor.Name,
            Image: actor.Image,
            detail: actor.detail
          };
        });

        Movies[index].Actor = Actor;

        let result2: any = await new Promise((resolve, reject) => {
          conn.query(
            "SELECT DISTINCT Person_R.* FROM Movie_R, creators_R, Person_R WHERE Movie_R.MID = creators_R.CMID AND creators_R.CPID = Person_R.PID AND Movie_R.Name LIKE ?",
            ['%' + Movies[index].Name + '%'],
            (err, result) => {
              if (err) reject(err);
              resolve(result);
            }
          );
        });

        let Creater: Creaters[] = result2.map((creator: any) => {
          return {
            PID: creator.PID,
            Name: creator.Name,
            Image: creator.Image,
            detail: creator.detail
          };
        });

        Movies[index].Creaters = Creater;
      }

      res.status(200).json(Movies);
    }
  });
});
