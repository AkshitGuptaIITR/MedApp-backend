const express = require("express");
const { protect } = require("../controllers/authController");
const { createPatient } = require("../controllers/patientController");

const router = express.Router();

router.post("/", protect, createPatient);

module.exports = router;