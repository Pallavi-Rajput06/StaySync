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

    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    available: {
      type: Boolean,
      default: true,
    },
    
    ownerPhone: {
      type: String,
      required: true,
    },
    ownerEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    popularity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["PG", "Hostel", "Flat", "Shared Room"],
      default: "Hostel",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hostel", hostelSchema);