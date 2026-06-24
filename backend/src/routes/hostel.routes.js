const express = require("express");

const router = express.Router();

const {
  createHostel,
  getAllHostels,
  getSingleHostel,
  deleteHostel,
} = require("../controllers/hostel.controller");

router.post("/", createHostel);

router.get("/", getAllHostels);

router.get("/:id", getSingleHostel);

router.delete("/:id", deleteHostel);

module.exports = router;