import express from "express";
import { authenticateToken } from "../services/AuthService.js";
import UserRepository from "../repositories/UserRepository.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/:follower/following/:following", (req, res) => {
  const followerUsername = req.params.follower;
  const loggedInUsername = req.username;
  const usernameToFollow = req.params.following;

  if (followerUsername !== loggedInUsername) {
    return res.status(401).send("Unauthorized");
  }
  if (followerUsername === usernameToFollow) {
    return res.status(400).send("Bad Request. Cannot follow yourself");
  }

  UserRepository.followUser(followerUsername, usernameToFollow);

  res.status(201).send("User followed");
});

router.delete("/:follower/following/:following", (req, res) => {
  const followerUsername = req.params.follower;
  const loggedInUsername = req.username;
  const usernameToUnfollow = req.params.following;

  if (followerUsername !== loggedInUsername) {
    return res.status(401).send("Unauthorized");
  }
  if (followerUsername === usernameToUnfollow) {
    return res.status(400).send("Bad Request. Cannot unfollow yourself");
  }

  UserRepository.unfollowUser(followerUsername, usernameToUnfollow);

  res.status(201).send("User unfollowed");
});

router.delete;

export default router;
