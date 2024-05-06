const {Router} = require("express");
const router = Router();
const {protect} = require("../controllers/authController");
const {createAppointment, getAllAppointments, updateAppointment} = require("../controllers/appointmentController");

router.post("/", protect, createAppointment);
router.get("/", protect, getAllAppointments);
router.put("/:id", protect, updateAppointment);

module.exports = router;