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
    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
