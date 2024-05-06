const express = require("express");
const { createHospital, getAllCities, getAllHospitalsForCity, getAllHospitalsForSpecialization } = require("../controllers/hospitalController");
const { protect } = require("../controllers/authController");
const router = express.Router();

router.post("/", createHospital);
router.get("/getAllCities", protect, getAllCities);
router.get("/getAllHospitalsForCity/:city", protect, getAllHospitalsForCity);
router.get("/getAllHospitalsForSpecialization/:specialization", protect, getAllHospitalsForSpecialization);

module.exports = router;