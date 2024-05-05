const mongoose = require("mongoose");

const appointmentModel = new mongoose.Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    ref: 'Patient',
    required: [true, "Patient Id is required."]
  },
  hospitalId: {
    type: mongoose.Types.ObjectId,
    ref: 'Hospital',
    required: [true, "Hospital Id is required."]
  },
  appointmentDate: {
    type: Date,
    required: [true, "Appointment Date is required."]
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User Id must be provided."]
  },
  reminder: {
    type: Boolean,
    default: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
});

const Appointment = mongoose.model("Appointment", appointmentModel);

module.exports = Appointment;
