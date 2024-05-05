const {Router} = require("express");
const router = Router();
const {protect} = require("../controllers/authController");
const {createAppointment, getAllAppointments} = require("../controllers/appointmentController");

router.post("/", protect, createAppointment);
router.get("/", protect, getAllAppointments);

module.exports = router;