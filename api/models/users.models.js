const { User } = require("../schemas/user.schema");

const saveUser = async (userId, userData) => {
  try {
    const user = new User({
      _id: userId,
      ...userData,
    });
    const savedUser = await user.save();

    if (savedUser) {
      return {
        status: "SUCCESS",
        data: savedUser,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const setSessionString = async (id, string = null) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { session: string },
    { new: true }
  );

  // console.log(updatedUser);
  return updatedUser;
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email }).lean().exec();

    if (user) {
      return {
        status: "SUCCESS",
        data: user,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.find().lean().exec();

    if (users.length > 0) {
      return {
        status: "SUCCESS",
        data: users,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const getUserById = async (_id) => {
  try {
    const user = await User.findById(_id).lean().exec();

    if (user) {
      return {
        status: "SUCCESS",
        data: user,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error.message,
    };
  }
};

const updateUser = async (conditionObj, updateObj, options) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      conditionObj,
      updateObj,
      options
    )
      .lean()
      .exec();

    if (updatedUser) {
      return {
        status: "SUCCESS",
        data: updatedUser,
      };
    } else {
      return {
        status: "FAILED",
      };
    }
  } catch (error) {
    return {
      status: "INTERNAL_SERVER_ERROR",
      error: error,
    };
  }
};

module.exports = {
  saveUser,
  getUserByEmail,
  getAllUsers,
  setSessionString,
  getUserById,
  updateUser,
};
