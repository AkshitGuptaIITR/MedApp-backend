const express = require("express");
const { createHospital } = require("../controllers/hospitalController");
const router = express.Router();

router.post("/", createHospital);

module.exports = router;