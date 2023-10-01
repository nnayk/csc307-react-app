import express from "express";

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
const port = 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ a: "Hello World!" });
});

app.get("/users", (req, res) => {
  res.send(USERS);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
