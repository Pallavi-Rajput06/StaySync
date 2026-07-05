const express = require("express");

const router = express.Router();

const {
  createHostel,
  getAllHostels,
  getSingleHostel,
  updateHostel,
  deleteHostel,
} = require("../controllers/hostel.controller");

router.post("/", createHostel);

router.get("/", getAllHostels);

router.get("/:id", getSingleHostel);

router.put("/:id", updateHostel);

router.delete("/:id", deleteHostel);

module.exports = router;