const Booking = require("../models/booking");

// @desc    Create new booking request
// @route   POST /api/bookings
// @access  Public (Landing page)
exports.createBooking = async (req, res) => {
  try {
    // 1. Grab the data sent from the frontend
    const { fullName, phone, serviceType, preferredDate, notes } = req.body;
    // 2. Basic validation (mongoose will also check, but it's good practice here too)
    if (!fullName || !email || !phone || !serviceType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // 3. Create a new booking in the database
    const booking = await Booking.create({
      fullName,
      phone,
      email,
      serviceType,
      preferredDate: preferredDate,
      notes: notes || null,
    });

    // 4. Send a success response back to the frontend
    res.status(201).json({
      status: "success",
      data: {
        Booking: booking,
      },
      message: "Booking created Successgully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error creating booking",
    });
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
