const UserModel = require("../models/users.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");

const addUser = async (req, res, next) => {
  const { password } = req.body;

  // Generating random encrypted password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(password, salt);

  const savedUser = await UserModel.saveUser(req.body);

  res.status(201).json({
    message: "SUCCESS",
    user: savedUser,
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await UserModel.getUserByEmail(email);

  if (!userFound) {
    return res.status(404).json({
      message: "INVALID USER",
    });
  }

  const isMatch = await bcrypt.compare(password, userFound.password);

  console.log(isMatch);

  if (isMatch) {
    const signedToken = await signToken(userFound);
    return res.status(200).json({
      message: "SUCCESS",
      token: signedToken,
    });
  } else {
    return res.status(404).json({
      message: "INVALID USER",
    });
  }
};

const listUsers = async (req, res, next) => {
  const users = await UserModel.getAllUsers();

  if (users.length > 0) {
    return res.status(200).json({
      message: "SUCCESS",
      data: users,
    });
  } else {
    return res.status(400).json({
      message: "FAILED",
      description: "No user found",
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  listUsers,
};
