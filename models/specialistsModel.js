const mongoose = require("mongoose");

const specialistsSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, "Specialist name is required."],
  },
  specialization: {
    type: String,
    required: [true, "Specialization is required."],
  },
  profileImage: {
    type: String,
  }
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  timestamps: true,
})

const Specialists = mongoose.model("Specialists", specialistsSchema);

module.exports = Specialists;