const mongoose = require("mongoose");

const cityGuideSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    overview: {
      type: String,
      required: true,
    },
    popularAreas: [
      {
        name: { type: String, required: true },
        cost: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    costOfLiving: {
      pgRent: { type: String, required: true },
      food: { type: String, required: true },
      transport: { type: String, required: true },
      utilities: { type: String, required: true },
    },
    safetyTips: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CityGuide", cityGuideSchema);
