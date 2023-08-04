const express = require("express");
const userRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const {
  addUser,
  loginUser,
  listUsers,
} = require("../controllers/users.controllers");

userRouter.post("/", addUser);

userRouter.get("/login", loginUser);

userRouter.get("/list", authentication, authorization, listUsers);

module.exports = {
  userRouter,
};
