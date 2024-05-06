const mongoose = require("mongoose");

const oaeScreening = new mongoose.Schema({
  numberOfOAETest: {
    type: Number,
  },
  patientId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Patient Id is required."],
  },
  lastOAEScreening: Date,
  wasOAEConducted: {
    type: Boolean,
    default: false,
  },
  lastOAEResult: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: { virtuals: true },
  timestamps: true,
});

const OAE = mongoose.model("OAE", oaeScreening);

module.exports = OAE;