const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Hospital must have a name."],
    },
    longitude: mongoose.Types.Decimal128,
    latitude: mongoose.Types.Decimal128,
    city: String,
    state: String,
    address: {
      type: String,
      required: [true, "Hospital must have an address."],
    },
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
    image: String,
    specialization: {
      type: [String],
      enum: ["OAE", "BERA", "SPEECH_THERAPY"]
    },
    facilities: {
      type: [String]
    },
    specialists: {
      type: [mongoose.Types.ObjectId],
      ref: "Specialists"
    },
    diagnosis: [String]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
