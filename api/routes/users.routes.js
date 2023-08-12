const express = require("express");
const userRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { generateId } = require("../middlewares/generateId.middleware.js");
const uploadProfile = require("../middlewares/uploadProfile.middleware.js");

const {
  addUser,
  loginUser,
  listUsers,
  getUserById,
  updateUser,
} = require("../controllers/users.controllers");

userRouter.post("/", generateId, uploadProfile, addUser);

userRouter.get("/login", loginUser);

userRouter.get("/list", authentication, authorization, listUsers);

userRouter.get(
  "/getUserById/:userId",
  authentication,
  authorization,
  getUserById
);

userRouter.patch("/update/:userId", authentication, authorization, updateUser);

module.exports = {
  userRouter,
};
