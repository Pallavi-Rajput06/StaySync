const express = require("express");
const protect = require("../middleware/auth.middleware");
const { adminOnly } = protect;

const router = express.Router();

const {
  createHostel,
  getMyHostels,
  getAllHostels,
  getSingleHostel,
  updateHostel,
  deleteHostel,
} = require("../controllers/hostel.controller");

router.post("/", protect, adminOnly, createHostel);

router.get("/my-hostels", protect, adminOnly, getMyHostels);

router.get("/", getAllHostels);

router.get("/:id", getSingleHostel);

router.put("/:id", protect, adminOnly, updateHostel);

router.delete("/:id", protect, adminOnly, deleteHostel);

module.exports = router;