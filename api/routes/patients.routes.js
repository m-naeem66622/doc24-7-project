const express = require("express");
const patientRouter = express.Router();
const { authentication } = require("../middlewares/authentication.middleware");
const { authorization } = require("../middlewares/authorization.middleware");
const { generateId } = require("../middlewares/generateId.middleware.js");
const uploadPatientProfile = require("../middlewares/uploadPatientProfile.middleware.js");

const {
  addPatient,
  loginPatient,
  listPatients,
  getPatientById,
  updatePatient,
} = require("../controllers/patients.controllers");

patientRouter.post(
  "/",
  generateId,
  uploadPatientProfile.single("patientProfile"),
  addPatient
);

patientRouter.get("/login", loginPatient);

patientRouter.get("/list", authentication, authorization, listPatients);

patientRouter.get(
  "/getPatientById/:patientId",
  authentication,
  authorization,
  getPatientById
);

patientRouter.patch(
  "/update/:patientId",
  authentication,
  authorization,
  updatePatient
);

module.exports = {
  patientRouter,
};
