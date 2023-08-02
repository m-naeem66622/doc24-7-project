const express = require("express");
const userRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { addUser } = require("../controllers/users.controllers");

userRouter.post("/", addUser);

module.exports = {
  userRouter,
};
