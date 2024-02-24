import express from "express";
import path from "path";
import { AddTwoNumbers } from "./controllers/math";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`<h1>Hello</h1>`);
});

app.post("/addTwoNumbers", AddTwoNumbers);

app.listen(8000);
