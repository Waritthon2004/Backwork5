import express from "express";
import bodyParser from "body-parser";
import { router as Person} from "./api/person";
import { router as Movie} from "./api/movie";
import { router as stars} from "./api/stars";
export const app = express();



//check body ก่อนเรียก path api
app.use(bodyParser.text());
app.use(bodyParser.json());
//-----------------

app.use("/Person",Person);
app.use("/Movie",Movie);
app.use("/Stars",stars);


