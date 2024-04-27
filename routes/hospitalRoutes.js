const express = require("express");
const { createHospital, getAllCities } = require("../controllers/hospitalController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.post("/", createHospital);
router.get("/getAllCities", protect, getAllCities);

module.exports = router;