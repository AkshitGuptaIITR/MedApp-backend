const { Router } = require("express");
const router = Router();
const { protect } = require("../controllers/authController");
const { createOAERecord, updateOAEData } = require("../controllers/oaeController");

router.post("/:id", protect, createOAERecord);
router.put("/:id", protect, updateOAEData);

module.exports = router;