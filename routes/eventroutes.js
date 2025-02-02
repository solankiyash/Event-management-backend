const express = require("express");
const {
  creatEvent,
  getEventsdata,
  updateEvent,
  deleteEvent,
  verifyEventOwner,
} = require("../controller/eventcontroller.js");
const { protect } = require("../middleware/auth.js");

const router = express.Router();

router.post("/create", protect, creatEvent);
router.get("/getevent", protect, getEventsdata);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

module.exports = router;
