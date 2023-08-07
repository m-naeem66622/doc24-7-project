const express = require("express");
const userRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const {
  addUser,
  loginUser,
  listUsers,
  logoutUser,
} = require("../controllers/users.controllers");
const {
  signupUserValidation,
} = require("../middlewares/userValidation.middleware");

userRouter.post("/", signupUserValidation, addUser);

userRouter.get("/login", loginUser);

userRouter.get("/logout",authentication, logoutUser);

userRouter.get("/list", authentication, authorization, listUsers);

module.exports = {
  userRouter,
};
