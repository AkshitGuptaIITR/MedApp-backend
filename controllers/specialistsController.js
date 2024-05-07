const Specialists = require("../models/specialistsModel");
const catchAsync = require("../utils/catchAsync");

const createSpecialists = catchAsync(async (req, res) => {
  const { name, specialization } = req.body;

  if(!name || !specialization){
    return res.status(400).json({
      status: "fail",
      message: "Please provide name and specialization"
    })
  }

  const newSpecialist = await Specialists.create({
    name,
    specialization
  });

  return res.status(201).json({
    status: "success",
    data: newSpecialist
  })
})

module.exports = {
  createSpecialists
}