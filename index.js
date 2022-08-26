import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());

const tweets = [];
const userData = [];

server.post("/sign-up", (req, res) => {
  userData.push(req.body);
  res.send(userData);
});

server.post("/tweets", (req, res) => {
  tweets.push(req.body);
  res.send(tweets);
});

server.get("/tweets", (req, res) => {
  const latestTweets = tweets.slice(-10);

  const userTweets = latestTweets.map((tweet) => {
    for (let i = 0; i < userData.length; i++) {
      if (tweet.username === userData[i].username) {
        return {...tweet, avatar: userData[i].avatar };
      }
    }
  });
  res.send(userTweets);
});

server.listen(5000);
