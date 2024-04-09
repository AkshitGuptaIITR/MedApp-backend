const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const { convertYYYYMMDDToDate } = require("../utils/functions");

const createPatient = catchAsync(async (req, res) => {
  const { id, hospitalId } = req.user;

  if (req.body.dob) {
    req.body.dob = convertYYYYMMDDToDate(req.body.dob);
  }
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

const getAllPatient = catchAsync(async (req, res) => {
  const { hospitalId } = req.user;

  const patients = await Patient.find({ hospitalId });

  res.status(200).json({
    status: "success",
    data: {
      patients
    }
  })
});

const updatePatientData = catchAsync(async (req, res) => {
  const { id } = req.params;

  const updatePatient = await Patient.findByIdAndUpdate(id, {
    ...req.body
  });

  res.status(200).json({
    status: "success",
    data: {
      updatePatient,
    }
  });
});

module.exports = {
  createPatient,
  getAllPatient,
  updatePatientData
}
