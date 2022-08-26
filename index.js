import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

const tweets = [];
const userData = [];

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    userData.push(req.body);
    res.status(201).send("OK");
  }
});

server.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push(req.body);
    res.status(201).send("OK");
  }
});

server.get("/tweets", (req, res) => {
  const latestTweets = tweets.slice(-10);

  const userTweets = latestTweets.map((tweet) => {
    for (let i = 0; i < userData.length; i++) {
      if (tweet.username === userData[i].username) {
        return { ...tweet, avatar: userData[i].avatar };
      }
    }
  });
  res.send(userTweets);
});

server.listen(5000);
