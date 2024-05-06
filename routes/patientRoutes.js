const express = require("express");
const { protect } = require("../controllers/authController");
const { createPatient, getAllPatient, updatePatientData } = require("../controllers/patientController");

const router = express.Router();

router.post("/", protect, createPatient);
router.get("/",protect, getAllPatient);
router.put("/:id", protect, updatePatientData);

module.exports = router;