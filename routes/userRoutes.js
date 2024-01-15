const express = require("express");
const { signUp, login, protect, refresh } = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/refresh", protect, refresh);

module.exports = router;
