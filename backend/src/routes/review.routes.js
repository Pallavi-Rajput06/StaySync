const express = require("express");
const protect = require("../middleware/auth.middleware");
const { adminOnly } = protect;
const router = express.Router();

const {
  addReview,
  getHostelReviews,
  getAllReviews,
  deleteReview,
} = require("../controllers/review.controller");

router.post("/:hostelId", protect, addReview);
router.get("/:hostelId", getHostelReviews);

// Admin moderation endpoints
router.get("/", protect, adminOnly, getAllReviews);
router.delete("/:reviewId", protect, adminOnly, deleteReview);

module.exports = router;
