const OAE = require("../models/oaeScreening");
const catchAsync = require("../utils/catchAsync");
const { convertYYYYMMDDToDate } = require("../utils/functions");

const createOAERecord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { wasOAEConducted } = req.body;

  const OAETest = await OAE.create({
    wasOAEConducted,
    patientId: id
  });

  res.status(201).json({
    status: "success",
    data: OAETest,
  })
});

const updateOAEData = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  if (req.body.lastOAEScreening) {
    req.body.lastOAEScreening = convertYYYYMMDDToDate(req.body.lastOAEScreening);
  }

  const updatedRecord = await OAE.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    status: "success",
    data: updatedRecord
  })
});

module.exports = {
  createOAERecord,
  updateOAEData,
}