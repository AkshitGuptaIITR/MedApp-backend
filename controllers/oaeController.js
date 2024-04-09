const OAE = require("../models/oaeScreening");
const catchAsync = require("../utils/catchAsync");
const { convertYYYYMMDDToDate } = require("../utils/functions");

const createOAERecord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { numberOfOAETest } = req.body;
  if (!numberOfOAETest) {
    res.status(400).json({
      status: "fail",
      message: "Please provide number of test"
    })
  }

  const OAETest = await OAE.create({
    numberOfOAETest,
    patientId: id
  });

  res.status(201).json({
    status: "success",
    data: OAETest,
  })
});

const updateOAEData = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { numberOfOAETest, lastOAEScreening } = req.body;
  let updateRecord = {};
  if (numberOfOAETest) {
    updateRecord.numberOfOAETest = numberOfOAETest;
  }
  if (lastOAEScreening) {
    updateRecord.lastOAEScreening = convertYYYYMMDDToDate(lastOAEScreening);
  }
  updatedRecord = await OAE.findByIdAndUpdate(id, updateRecord);

  res.status(200).json({
    status: "success",
    data: updatedRecord
  })
});

module.exports = {
  createOAERecord,
  updateOAEData,
}