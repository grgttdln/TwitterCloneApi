import express from "express";
import UserRepository from "../repositories/UserRepository.js";
import AuthService from "../services/AuthService.js";

const router = express.Router();

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const authResult = AuthService.authorizeUser(username, password);
  console.log(authResult);
  if (authResult.success) {
    res.status(200).send(authResult.token);
  } else {
    res.status(401).send("Unauthorized");
  }
});

router.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  UserRepository.createUser(username);
  AuthService.registerUser(username, password);

  res.status(201).send("User created");
});

export default router;
