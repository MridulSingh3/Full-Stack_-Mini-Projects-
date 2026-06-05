const express = require("express");
const router = express.Router();
const { getJorunels, getJournel, createJournels, updateJournel, deleteJournel } = require("../controllers/journelController");
const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getJorunels);
router.get("/:id", getJournel);
router.post("/create", createJournels);
router.put("/:id", updateJournel);
router.delete("/:id", deleteJournel);

module.exports = router;