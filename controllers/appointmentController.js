const catchAsync = require("../utils/catchAsync");

const createAppointment = catchAsync(async (req, res) => {
  const { id: logged_in_user_id, hospitalId: logged_in_hospital_id } = req.user;
  const { appointmentDate, patientId, hospitalId } = req.body;

  if(!appointmentDate || !patientId || !hospitalId) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all required fields"
    });
  }

  if(logged_in_hospital_id !== hospitalId) {
    return res.status(401).json({
      status: "fail",
      message: "You are not authorized to create appointment for this hospital"
    });
  }

  const newAppointment = await Appointment.create({
    patientId,
    hospitalId,
    addedBy: logged_in_user_id,
    appointmentDate
  });

  const hospital_data = await Hospital.findById(hospitalId);

  res.status(201).json({
    status: "success",
    data: {
      appointment: newAppointment,
      hospital: hospital_data
    }
  });
});

const getAllAppointments = catchAsync(async (req, res) => {
  const { hospitalId } = req.user;

  const appointments = await Appointment.find({ hospitalId });

  res.status(200).json({
    status: "success",
    data: {
      appointments
    }
  });
})

module.exports = {
  createAppointment,
  getAllAppointments,
}