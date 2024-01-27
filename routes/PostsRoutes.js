import express from "express";
import { authenticateToken } from "../services/AuthService.js";
import PostRepository from "../repositories/PostRepository.js";
import UserRepository from "../repositories/UserRepository.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", (req, res) => {
  let posts = [];
  let username = "";
  if (req.query.username !== undefined) {
    username = req.query.username;
    posts = PostRepository.getPostOfUser(username);
  } else {
    username = req.username;
    const following = UserRepository.getFollowingUsernames(username);
    posts = PostRepository.getFeedOfUser(username, following);
  }

  res.status(200).send(posts);
});

router.post("/", (req, res) => {
  if (req.body.content === undefined) {
    res.status(400).send("Bad Request");
  }

  const username = req.username;
  const content = req.body.content;

  console.log("Creating post for ", username, " with content ", content);
  const post = PostRepository.createPost(username, content, new Date());
  res.status(201).send(post);
});

router.patch("/:id", (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).send("Bad Request. No post id provided");
  }
  console.log(req.body.action);
  if (
    req.body.action === undefined ||
    ["like", "unlike"].includes(req.body.action) === false
  ) {
    return res.status(400).send("Bad Request. Invalid action provided");
  }

  const id = req.params.id;
  const action = req.body.action;
  const username = req.username;

  if (action === "like") {
    PostRepository.likePost(username, id);
    return res.status(200).send("Post liked");
  } else if (action === "unlike") {
    PostRepository.unlikePost(username, id);
    return res.status(200).send("Post unliked");
  }
});

export default router;
