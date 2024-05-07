const { default: mongoose } = require("mongoose");
const Patient = require("../models/patientModel");
const catchAsync = require("../utils/catchAsync");
const { convertYYYYMMDDToDate } = require("../utils/functions");
const Appointment = require("../models/appointmentModel");
const OAE = require("../models/oaeScreening");

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
  const { _id } = req.user;

  const patients = await Patient.aggregate([
    {
      $match: { addedBy: _id }
    },
    {
      $project: {
        name: 1,
        _id: 1,
        parentName: 1,
        contactNumber: 1,
        normalizedField: { $toLower: "$parentName" },
        startingChar: { $substr: [{ $toLower: "$parentName" }, 0, 1] }
      }
    },
    {
      $group: {
        _id: "$startingChar",
        patients: { $push: "$$ROOT" },
      }
    },
    {
      $sort: { normalizedField: -1, startingChar: -1, _id: 1 }
    },
  ]);

  let totalCount = 0;

  patients.forEach((patient) => {
    const count = patient.patients.length;

    totalCount += count;
  });

  res.status(200).json({
    status: "success",
    data: patients,
    totalCount,
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

const deletePatients = catchAsync(async (req, res) => {
  const { patientIds } = req.body;

  if (!Array.isArray(patientIds) || patientIds.length === 0) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide an array of patient ids"
    })
  }

  await Patient.deleteMany({ _id: { $in: patientIds } });
  await Appointment.deleteMany({ patientId: { $in: patientIds } });
  await OAE.deleteMany({ patientId: { $in: patientIds } });
  res.status(204).json({
    status: "success",
    message: "Patients deleted successfully"
  })
})

module.exports = {
  createPatient,
  getAllPatient,
  updatePatientData,
  deletePatients,
}
