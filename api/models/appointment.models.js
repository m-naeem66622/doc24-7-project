const Appointment = require("../schemas/appointment.schema");

const saveAppointment = async (data) => {
  try {
    const appointment = new Appointment(data);
    const savedAppointment = await appointment.save();

    if (savedAppointment) {
      return {
        status: "SUCCESS",
        data: savedAppointment,
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
  saveAppointment,
};
