import express from "express";
import cors from "cors";
import HttpStatusCode from "http-status-codes";
import {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
} from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ a: "Hello World!" });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let result = [];
  if (name != undefined) {
    result = findUserByName(name);
  }
  if (job != undefined) {
    result = findUserByJob(job);
  }
  res.send(result);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined || result.length == 0)
    res.status(HttpStatusCode.NOT_FOUND).send("Resource not found.");
  else {
    result = { users_list: result };
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = addUser(req.body);
  res.status(HttpStatusCode.CREATED).send(userToAdd);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  if (index === -1)
    res.status(HttpStatusCode.NOT_FOUND).send("Resource not found.");
  else {
    res.status(HttpStatusCode.NO_CONTENT).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
