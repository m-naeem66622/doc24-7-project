const UserModel = require("../models/users.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");

const addUser = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Generating random encrypted password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    req.body.userProfilePhotoPath = req?.fullFilePath;

    const savedUser = await UserModel.saveUser(req.userId, req.body);

    res.status(201).json({
      message: "SUCCESS",
      user: savedUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userFound = await UserModel.getUserByEmail(email);

    if (!userFound) {
      return res.status(404).json({
        message: "INVALID USER",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

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
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const listUsers = async (req, res, next) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.getUserById(userId);

    if (user) {
      return res.status(200).json({
        message: "SUCCESS",
        data: user,
      });
    } else {
      return res.status(404).json({
        message: "FAILED",
        description: "No user found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const updatedUser = await UserModel.updateUser(
      conditionObj,
      updateObj,
      options
    );

    if (updatedUser) {
      return res.status(200).json({
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      return res.status(404).json({
        message: "FAILED",
        description: "No user found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

module.exports = {
  addUser,
  loginUser,
  listUsers,
  getUserById,
  updateUser,
};
