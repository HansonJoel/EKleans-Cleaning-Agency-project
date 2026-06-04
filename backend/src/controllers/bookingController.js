const Booking = require("../models/booking");

// @desc    Create new booking request
// @route   POST /api/bookings
// @access  Public (Landing page)
// src/controllers/bookingController.js

exports.createBooking = async (req, res) => {
  try {
    // Validation is already done by the middleware!
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get all bookings (For the Admin Dashboard)
// @route   GET /api/bookings
// @access  Private (We will add authentication later, for now it's open)
exports.getBookings = async (req, res) => {
  try {
    // Fetch all bookings from the database, sorted by newest first
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
