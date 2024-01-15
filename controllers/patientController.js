const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");

const createPatient = catchAsync(async (req, res) => {
  const { id, hospitalId } = req.user;

  const newPatient = await Patient.create({
    addedBy: id,
    hospitalId,
    ...req.body,
  });

  res.status(201).json({
    status: "success",
    data: {
      patient: newPatient,
    }
  })
});

module.exports = {
  createPatient,
}
