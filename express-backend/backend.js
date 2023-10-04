import express from "express";
import cors from "cors";
import HttpStatusCode from "http-status-codes";

const USERS = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

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
  console.log(`name: ${name}, job: ${job}`);
  let result = USERS;
  if (name != undefined) {
    result = findUserByName(name);
  }
  if (job != undefined) {
    result = findUserByJob(job);
  }
  res.send(result);
});

const findUserByName = (name) => {
  return USERS["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
  return USERS["users_list"].filter((user) => user["job"] === job);
};

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

function findUserById(id) {
  return USERS["users_list"].find((user) => user["id"] === id); // or line below
  //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd["id"] = generateID(5);

  addUser(userToAdd);
  res.status(HttpStatusCode.CREATED).end();
});

function generateID(length) {
  const OFFSET = 97;
  const NUM_LETTERS = 26;
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomAscii = Math.floor(Math.random() * NUM_LETTERS);
    randomString += String.fromCharCode(randomAscii + OFFSET);
  }
  return randomString;
}

function addUser(user) {
  USERS["users_list"].push(user);
}

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = USERS["users_list"].findIndex((user) => user["id"] === id);
  if (index === -1)
    res.status(HttpStatusCode.NOT_FOUND).send("Resource not found.");
  else {
    USERS["users_list"].splice(index, 1);
    res.status(HttpStatusCode.OK).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
