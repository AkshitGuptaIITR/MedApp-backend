const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/userRoutes");
const hospitalRouter = require("./routes/hospitalRoutes");
const patientRouter = require("./routes/patientRoutes");
const oaeRouter = require("./routes/oaeRoutes");
const appointmentRouter = require("./routes/appointmentRoutes");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");

dotenv.config();

const app = express();
app.use(helmet());

const allowList = [process.env.ALLOWED_URL_1, process.env.ALLOWED_URL_2];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions = {
    credentials: true,
  };
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions.origin = false; // disable CORS for this request
  }

  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(corsOptionsDelegate));

app.use(express.json({ limit: "8mb" }));

app.use("/test", (req, res) => {
  res.send("Working");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/hospital", hospitalRouter);
app.use("/api/v1/patient", patientRouter);
app.use("/api/v1/oae", oaeRouter);
app.use("/api/v1/appointment", appointmentRouter);

app.use("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;