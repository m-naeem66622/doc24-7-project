const UserModel = require("../models/users.models");

const addUser = async (req, res, next) => {
  const savedUser = await UserModel.saveUser(req.body);

  res.status(201).json({
    message: "SUCCESS",
    user: savedUser,
  });
};

module.exports = {
  addUser,
};
