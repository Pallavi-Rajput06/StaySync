const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    rent: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["boys", "girls", "co-ed"],
      required: true,
    },

    facilities: [String],

    images: [String],

    rating: {
      type: Number,
      default: 0,
    },

    safetyScore: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hostel", hostelSchema);