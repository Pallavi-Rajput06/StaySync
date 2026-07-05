const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema(
  {
    hostelName: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    area: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
    },

    description: {
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

    roomType: {
      type: String,
      enum: ["Single", "Double", "Triple", "Dormitory"],
      required: true,
    },

    facilities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    ownerName: {
      type: String,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    rating: {
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