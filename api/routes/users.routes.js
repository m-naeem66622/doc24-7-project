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
  logoutUser,
  getUserById,
  updateUser,
} = require("../controllers/users.controllers");
const {
  signupUserValidation,
} = require("../middlewares/userValidation.middleware");

userRouter.post("/", generateId, uploadProfile, addUser);

userRouter.get("/login", loginUser);

userRouter.get("/logout",authentication, logoutUser);

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
