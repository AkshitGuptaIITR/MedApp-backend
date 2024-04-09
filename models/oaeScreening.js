const mongoose = require("mongoose");

const oaeScreening = new mongoose.Schema({
  numberOfOAETest: {
    type: Number,
    required: [true, "Please provide number of OAETest."],
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Patient Id is required."],
  },
  lastOAEScreening: Date,
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

const OAE = mongoose.model("OAE", oaeScreening);

module.exports = OAE;