const express = require("express");
const protect = require("../middleware/auth.middleware");
const { adminOnly } = protect;
const router = express.Router();

const {
  getCityGuide,
  getAllCityGuides,
  createOrUpdateCityGuide,
} = require("../controllers/cityGuide.controller");

router.get("/", getAllCityGuides);
router.get("/:city", getCityGuide);

// Admin setup/update endpoint
router.post("/", protect, adminOnly, createOrUpdateCityGuide);

module.exports = router;
