const Review = require("../models/review.model");
const Hostel = require("../models/hostel.model");

// Recalculates average rating and review counts on hostel
const updateHostelRating = async (hostelId) => {
  const reviews = await Review.find({ listing: hostelId });
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? parseFloat((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
      : 0;

  await Hostel.findByIdAndUpdate(hostelId, {
    rating: averageRating,
    totalReviews,
  });
};

const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { hostelId } = req.params;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    // Check if user already reviewed this hostel to prevent duplicates
    const existingReview = await Review.findOne({
      user: req.user.id,
      listing: hostelId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this hostel",
      });
    }

    const review = await Review.create({
      user: req.user.id,
      listing: hostelId,
      rating,
      comment,
    });

    // Update hostel aggregated rating
    await updateHostelRating(hostelId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getHostelReviews = async (req, res) => {
  try {
    const { hostelId } = req.params;

    const reviews = await Review.find({ listing: hostelId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email")
      .populate("listing", "hostelName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    const hostelId = review.listing;

    await Review.findByIdAndDelete(reviewId);

    // Update hostel aggregated rating
    await updateHostelRating(hostelId);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getHostelReviews,
  getAllReviews,
  deleteReview,
};
