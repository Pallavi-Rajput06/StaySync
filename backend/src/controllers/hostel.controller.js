const Hostel = require("../models/hostel.model");
const User = require("../models/user.model");

const createHostel = async (req, res) => {
  try {
    const {
      hostelName,
      city,
      area,
      address,
      description,
      rent,
      gender,
      roomType,
      ownerName,
      ownerPhone,
      ownerEmail,
      location,
    } = req.body;

    if (
      !hostelName ||
      !city ||
      !area ||
      !address ||
      !description ||
      !rent ||
      !gender ||
      !roomType ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail ||
      !location ||
      !location.latitude ||
      !location.longitude
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields, including latitude and longitude.",
      });
    }

    // Attach owner user ID
    const newHostelData = {
      ...req.body,
      owner: req.user.id,
    };

    const hostel = await Hostel.create(newHostelData);

    res.status(201).json({
      success: true,
      message: "Hostel Added Successfully",
      hostel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyHostels = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const hostels = await Hostel.find({
      $or: [
        { owner: req.user.id },
        { ownerEmail: user.email },
      ],
    });

    res.status(200).json({
      success: true,
      count: hostels.length,
      hostels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();

    res.status(200).json({
      success: true,
      count: hostels.length,
      hostels,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    res.status(200).json({
      success: true,
      hostel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateHostel = async (req, res) => {
  try {
    let hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    // Check ownership or admin privileges
    const user = await User.findById(req.user.id);
    const isAuthorized =
      user.role === "admin" ||
      (hostel.owner && hostel.owner.toString() === req.user.id) ||
      (hostel.ownerEmail &&
        hostel.ownerEmail.toLowerCase() === user.email.toLowerCase());

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this hostel",
      });
    }

    // Backend validation for updates
    const {
      hostelName,
      city,
      area,
      address,
      description,
      rent,
      gender,
      roomType,
      ownerName,
      ownerPhone,
      ownerEmail,
      location,
    } = req.body;

    if (
      !hostelName ||
      !city ||
      !area ||
      !address ||
      !description ||
      !rent ||
      !gender ||
      !roomType ||
      !ownerName ||
      !ownerPhone ||
      !ownerEmail ||
      !location ||
      !location.latitude ||
      !location.longitude
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields, including latitude and longitude.",
      });
    }

    hostel = await Hostel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Hostel Updated Successfully",
      hostel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }

    // Check ownership or admin privileges
    const user = await User.findById(req.user.id);
    const isAuthorized =
      user.role === "admin" ||
      (hostel.owner && hostel.owner.toString() === req.user.id) ||
      (hostel.ownerEmail &&
        hostel.ownerEmail.toLowerCase() === user.email.toLowerCase());

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this hostel",
      });
    }

    await Hostel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Hostel deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleVerifyHostel = async (req, res) => {
  try {
    const hostel = await Hostel.findById(req.params.id);
    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel not found",
      });
    }
    hostel.verified = !hostel.verified;
    await hostel.save();
    res.status(200).json({
      success: true,
      message: `Hostel verification status updated to ${hostel.verified}`,
      hostel,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHostel,
  getMyHostels,
  getAllHostels,
  getSingleHostel,
  updateHostel,
  deleteHostel,
  toggleVerifyHostel,
};