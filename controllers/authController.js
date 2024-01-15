const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
};

const signUp = catchAsync(async (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  req.body.active = null;
  const newUser = await User.create(req.body);
  const token = signToken(newUser.id);
  res.status(201).json({
    status: "success",
    token,
    data: {
      token,
      user: newUser
    }
  })
});

const login = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  email = email.toLowerCase();
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  user.password = null;

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    data: {
      token,
      user,
    }
  })
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get access", 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("The user doesn't exists", 401));
  }
  req.user = currentUser;
  next();
});

const refresh = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    }
  });
});

module.exports = {
  signUp,
  login,
  protect,
  refresh,
}
