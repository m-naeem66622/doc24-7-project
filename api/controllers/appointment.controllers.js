const AppointmentModel = require("../models/appointment.models");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/signToken");
const { DateTime } = require("luxon");

const addAppointment = async (req, res, next) => {
  try {
    const { appointmentDate } = req.body;

    const appointmentJSDate = new Date(appointmentDate);

    const startTime = DateTime.fromJSDate(appointmentJSDate).toJSDate();
    const endTime = DateTime.fromJSDate(appointmentJSDate)
      .setZone("Asia/Karachi")
      .plus({ minutes: 20 })
      .toJSDate();

    req.body.startTime = startTime;
    req.body.endTime = endTime;

    const savedAppointment = await AppointmentModel.saveAppointment(req.body);

    res.status(201).json({
      message: "SUCCESS",
      appointment: savedAppointment?.data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SORRY: Something went wrong",
    });
  }
};

module.exports = {
  addAppointment,
};
