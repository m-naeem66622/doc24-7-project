const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const systemRoles = {
  role: ["DOCTOR", "CLINICAL STAFF", "ADMIN"],
  shift: ["MORNING", "EVENING"],
  department: ["PSYCHOLOGY", "REGULAR", "HEART"],
};

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: true,
      uppercase: true,
    },
    age: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["MALE", "FEMALE"],
    },
    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "INACTIVE"],
    },
    session: {
      type: String,
      default: null,
    },
    systemRoles: [
      {
        role: {
          type: String,
          required: true,
          enum: systemRoles.role,
        },
        shift: {
          type: String,
          required: true,
          enum: systemRoles.shift,
        },
        department: {
          type: String,
          required: true,
          enum: systemRoles.department,
        },
      },
    ],
  },
  {
    timestamps: true,
    _id: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User, systemRoles };
