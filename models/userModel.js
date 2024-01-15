const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email address."],
      unique: [true, "Email address already registered."],
      validate: [validator.isEmail, "Please enter a valid e-mail"],
    },
    password: {
      type: String,
      required: [true, "Enter Your Password"],
      select: false,
    },
    mobileNumber: {
      type: Number,
      validate: [
        function () {
          if (this.mobileNumber.toString().length === 10) {
            return true;
          }
          return false;
        },
        "Please Enter a valide mobile number.",
      ],
    },
    hospitalId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User must be related to hospital."],
      ref: "Hospital",
    },
    active: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;