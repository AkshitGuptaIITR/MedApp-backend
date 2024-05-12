const express = require("express");
const { protect } = require("../controllers/authController");
const { createPatient, getAllPatient, updatePatientData, deletePatients, getPatientData } = require("../controllers/patientController");

const router = express.Router();

router.post("/", protect, createPatient);
router.get("/",protect, getAllPatient);
router.put("/:id", protect, updatePatientData);
router.get("/:id", protect, getPatientData);
router.delete("/", protect, deletePatients);

module.exports = router;