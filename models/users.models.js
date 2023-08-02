const User = require("../schemas/user.schema");

const saveUser = async (userData) => {
  const user = new User(userData);
  const savedUser = await user.save();
  return savedUser;
};

module.exports = {
  saveUser,
};
