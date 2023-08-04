const User = require("../schemas/user.schema");

const saveUser = async (userData) => {
  const user = new User(userData);
  const savedUser = await user.save();
  return savedUser;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email }).lean().exec();
  return user;
};

const getAllUsers = async () => {
  const users = await User.find().lean().exec();
  return users;
};

module.exports = {
  saveUser,
  getUserByEmail,
  getAllUsers,
};
