const Booking = require("../models/booking");
const Client = require("../models/Client");

// @desc    Create new booking request
// @route   POST /api/bookings
// @access  Public (Landing page)
// src/controllers/bookingController.js

exports.createBooking = async (req, res) => {
  try {
    const { fullName, email, phone, serviceType, preferredDate } = req.body;

    // 1. Find the hidden account by email
    let client = await Client.findOne({ email: email.toLowerCase() });

    // 2. If no account exists, create one silently
    if (!client) {
      client = await Client.create({ fullName, email, phone });
    } else {
      // Optional: Update details if they used a new phone number
      client.fullName = fullName;
      client.phone = phone;
      await client.save();
    }

    // 3. Create the booking and link it to the Client's _id
    const booking = await Booking.create({
      client: client._id,
      fullName,
      email,
      phone,
      serviceType,
      preferredDate,
    });

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
exports.getBookings = async (req, res) => {
  try {
    // UPDATED: .populate('client') replaces the ID with the actual Client object data!
    const bookings = await Booking.find()
      .populate("client", "fullName email phone")
      .sort({ createdAt: -1 });

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
