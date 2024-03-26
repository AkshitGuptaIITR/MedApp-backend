const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide patient name."]
  },
  hospitalId: {
    type: mongoose.Types.ObjectId,
    ref: 'Hospital',
    required: [true, "Hospital Id is required."]
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User Id must be provided."]
  },
  parentName: {
    type: String,
    required: [true, "Please provide parent's name."],
  },
  dob: {
    type: Date,
    required: [true, "Please Provide Date of birth."]
  },
  contactNumber: {
    type: Number,
    required: [true, "Please provide contact Number."],
  },
  birthCertificate: {
    type: String,
    required: [true, "Please provide birth certificate."],
  },
  aadharNumber: {
    type: Number,
    required: [true, "Please provide aadhar Number."],
  },
  address: String,
  deliveryPlace: {
    type: String,
    required: [true, "Please provide place delivery place."],
  },
  deliveryType: {
    type: String,
    default: "RIGHT_TIME",
    enum: ["RIGHT_TIME", "PREMATURE", "POSTMATURE"],
  },
  deliverySection: {
    type: String,
    default: "NORMAL",
    enum: ["NORMAL", "C_SECTION"],
  },
  birthWeight: {
    type: mongoose.Types.Decimal128,
  },
  birthCry: {
    type: String,
    enum: ["NORMAL", "DELAYED"],
    default: "NORMAL"
  },
  blueness: {
    type: Boolean,
    default: false,
  },
  oaeScreening: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
