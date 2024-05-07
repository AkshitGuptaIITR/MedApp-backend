const { Router } = require("express");
const router = Router();
const { protect } = require("../controllers/authController");
const { createSpecialists } = require("../controllers/specialistsController");

router.post("/", protect, createSpecialists);

module.exports = router;