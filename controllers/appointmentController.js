const Appointment = require("../models/appointmentModel");
const OAE = require("../models/oaeScreening");
const catchAsync = require("../utils/catchAsync");
const { convertYYYYMMDDToDate } = require("../utils/functions");

const createAppointment = catchAsync(async (req, res) => {
  const { id: logged_in_user_id } = req.user;
  let { appointmentDate, patientId, hospitalId, oaeId } = req.body;

  if (oaeId) {
    const oaeRecord = await OAE.findById(oaeId);

    if (!oaeRecord) {
      return res.status(404).json({
        status: "fail",
        message: "OAE record not found"
      });
    }

    patientId = oaeRecord.patientId;
  }

  if (!appointmentDate || !patientId || !hospitalId) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all required fields"
    });
  }

  appointmentDate = convertYYYYMMDDToDate(appointmentDate);

  const newAppointment = await Appointment.create({
    patientId,
    hospitalId,
    addedBy: logged_in_user_id,
    appointmentDate,
  });

  res.status(201).json({
    status: "success",
    data: newAppointment
  });
});

const updateAppointment = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatedRecord = await Appointment.findByIdAndUpdate(id, req.body);

  return res.status(200).json({
    status: "success",
    data: updatedRecord
  })
})

const getAllAppointments = catchAsync(async (req, res) => {
  const { _id } = req.user;

  const appointments = await Appointment.find({ addedBy: _id, appointmentDate: { $gte: new Date() } }).populate("patientId");

  res.status(200).json({
    status: "success",
    data: appointments
  });
})

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
}