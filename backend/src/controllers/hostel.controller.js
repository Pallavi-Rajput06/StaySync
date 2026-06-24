const Hostel = require("../models/hostel.model");


const createHostel = async (req, res) => {
	try {
	  const hostel = await Hostel.create(req.body);
  
	  res.status(201).json({
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
	  const hostel = await Hostel.findById(
		req.params.id
	  );
  
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



  const deleteHostel = async (req, res) => {
	try {
	  const hostel = await Hostel.findById(
		req.params.id
	  );
  
	  if (!hostel) {
		return res.status(404).json({
		  success: false,
		  message: "Hostel not found",
		});
	  }
  
	  await Hostel.findByIdAndDelete(
		req.params.id
	  );
  
	  res.status(200).json({
		success: true,
		message: "Hostel deleted",
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
	getAllHostels,
	getSingleHostel,
	deleteHostel,
  };