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

module.exports = {
  createHospital
}