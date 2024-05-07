const Hospital = require("../models/hospitalModel");
const catchAsync = require("../utils/catchAsync");

const createHospital = catchAsync(async (req, res, next) => {
  const newHospital = await Hospital.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      hospital: newHospital,
    }
  })
});

const getAllCities = catchAsync(async (req, res) => {
  const cities = await Hospital.distinct("city");

  res.status(200).json({
    status: "success",
    data: {
      cities
    }
  })
})

const getAllHospitalsForCity = catchAsync(async (req, res) => {
  const { city } = req.params;

  if (!city) return res.status(400).json({
    status: "fail",
    message: "Please provide city"
  })

  const hospitals = await Hospital.find({ city });

  res.status(200).json({
    status: "success",
    data: {
      hospitals
    }
  })
});

const getAllHospitalsForSpecialization = catchAsync(async (req, res) => {
  const { specialization } = req.params;

  if (!specialization) return res.status(400).json({
    status: "fail",
    message: "Please provide specialization"
  });

  const hospitals = await Hospital.find({ specialization });

  res.status(200).json({
    status: "success",
    data: hospitals
  })
});

const getHospitalById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const hospital = await Hospital.findById(id).populate("specialists");

  if (!hospital) return res.status(404).json({
    status: "fail",
    message: "Hospital not found"
  })

  res.status(200).json({
    status: "success",
    data: hospital
  })
})

const updateHospitalData = catchAsync(async(req, res) => {
  const { id } = req.params;

  if(!id){
    return res.status(400).json({
      status: "fail",
      message: "Please provide hospital id"
    })
  }

  await Hospital.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "success",
    message: "Hospital data updated successfully"
  })
})

module.exports = {
  createHospital,
  getAllCities,
  getAllHospitalsForCity,
  getAllHospitalsForSpecialization,
  getHospitalById,
  updateHospitalData,
}