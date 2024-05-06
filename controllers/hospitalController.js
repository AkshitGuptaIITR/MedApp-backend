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
})

module.exports = {
  createHospital,
  getAllCities,
  getAllHospitalsForCity,
  getAllHospitalsForSpecialization,
}