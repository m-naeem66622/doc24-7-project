const PatientModel = require("../models/patients.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");

const addPatient = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Generating random encrypted password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(password, salt);

    req.body.patientProfilePhotoPath = req?.fullFilePath;

    const savedPatient = await PatientModel.savePatient(
      req.patientId,
      req.body
    );

    res.status(201).json({
      message: "SUCCESS",
      data: savedPatient,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const loginPatient = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const patientFound = await PatientModel.getPatientByEmail(email);

    if (!patientFound) {
      return res.status(404).json({
        message: "INVALID Patient",
      });
    }

    const isMatch = await bcrypt.compare(password, patientFound.password);

    if (isMatch) {
      const signedToken = await signToken(patientFound);
      return res.status(200).json({
        message: "SUCCESS",
        token: signedToken,
      });
    } else {
      return res.status(404).json({
        message: "INVALID Patient",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const listPatients = async (req, res, next) => {
  try {
    const patients = await PatientModel.getAllPatients();

    if (patients.length > 0) {
      return res.status(200).json({
        message: "SUCCESS",
        data: patients,
      });
    } else {
      return res.status(400).json({
        message: "FAILED",
        description: "No Patient found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const patient = await PatientModel.getPatientById(patientId);

    if (patient) {
      return res.status(200).json({
        message: "SUCCESS",
        data: patient,
      });
    } else {
      return res.status(404).json({
        message: "FAILED",
        description: "No Patient found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const updatedPatient = await PatientModel.updatePatient(
      conditionObj,
      updateObj,
      options
    );

    if (updatedPatient) {
      return res.status(200).json({
        message: "SUCCESS",
        data: updatedPatient,
      });
    } else {
      return res.status(404).json({
        message: "FAILED",
        description: "No Patient found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

module.exports = {
  addPatient,
  loginPatient,
  listPatients,
  getPatientById,
  updatePatient,
};
