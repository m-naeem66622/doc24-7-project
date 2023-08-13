const UserModel = require("../models/users.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");
const { validationResult } = require("express-validator");
const { generateSession } = require("../helpers/generateSession");

const addUser = async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    const { email, password } = req.body;

    const userFound = await UserModel.getUserByEmail(email);

    if (userFound) {
      return res.status(409).json({
        message: "EMAIL ALREADY EXIST",
      });
    }

    // Generating Random Session String
    const session = generateSession();
    req.body.session = session;

    // Generating salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    req.body.userProfilePhotoPath = req?.fullFilePath;

    const savedUser = await UserModel.saveUser(req.userId, req.body);

    savedUser.status === "SUCCESS"
      ? res.status(201).json({
          message: "SUCCESS",
          user: savedUser.data,
        })
      : res.status(500).json({
          message: savedUser.status,
          error: savedUser.error,
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

    if (userFound.status !== "SUCCESS") {
      return res.status(404).json({
        message: "INVALID USER",
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.data?.password);

    if (isMatch) {
      const sessionString = generateSession();
      userFound.session = sessionString;
      await UserModel.setSessionString(userFound._id, sessionString);
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

const logoutUser = async (req, res, next) => {
  console.log("I am reached in logout User");
  const logoutResult = await UserModel.setSessionString(req.decodedToken._id);
  if (!logoutResult.session) {
    return res.status(200).json({
      message: "SUCCESS",
    });
  } else {
    return res.status(400).json({
      message: "FAILED",
      description: "User not logout",
    });
  }
};

const listUsers = async (req, res, next) => {
  try {
    const users = await UserModel.getAllUsers();

    if (users.status === "SUCCESS") {
      return res.status(200).json({
        message: users.status,
        data: users.data,
      });
    } else if (users.status === "FAILED") {
      return res.status(400).json({
        message: users.status,
        description: "No user found",
      });
    } else {
      return res.status(400).json({
        message: users.status,
        error: users.error,
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
  logoutUser,
  getUserById,
  updateUser,
};
