const CityGuide = require("../models/cityGuide.model");

const getCityGuide = async (req, res) => {
  try {
    const { city } = req.params;

    const guide = await CityGuide.findOne({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (!guide) {
      return res.status(404).json({
        success: false,
        message: `No relocation guide found for ${city}`,
      });
    }

    res.status(200).json({
      success: true,
      guide,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCityGuides = async (req, res) => {
  try {
    const guides = await CityGuide.find();
    res.status(200).json({
      success: true,
      guides,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createOrUpdateCityGuide = async (req, res) => {
  try {
    const { city, overview, popularAreas, costOfLiving, safetyTips } = req.body;

    if (!city || !overview || !popularAreas || !costOfLiving || !safetyTips) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let guide = await CityGuide.findOne({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });

    if (guide) {
      guide.overview = overview;
      guide.popularAreas = popularAreas;
      guide.costOfLiving = costOfLiving;
      guide.safetyTips = safetyTips;
      await guide.save();
    } else {
      guide = await CityGuide.create({
        city,
        overview,
        popularAreas,
        costOfLiving,
        safetyTips,
      });
    }

    res.status(200).json({
      success: true,
      message: "City guide saved successfully",
      guide,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCityGuide,
  getAllCityGuides,
  createOrUpdateCityGuide,
};
