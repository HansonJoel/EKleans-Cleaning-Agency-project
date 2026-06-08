const Booking = require("../models/booking");
const Client = require("../models/Client");

// @desc    Create new booking request
// @route   POST /api/bookings
// @access  Public (Landing page)
// src/controllers/bookingController.js

exports.createBooking = async (req, res) => {
  try {
    const { fullName, email, phone, serviceType, preferredDate } = req.body;

    // 1. Find the client AND explicitly ask Mongoose to include the password field for this check
    let client = await Client.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );
    let actionFlag = "";

    // 2. Logic: Decide what action the frontend needs to take
    if (!client) {
      // Scenario A: Completely new user
      client = await Client.create({ fullName, email, phone });
      actionFlag = "set_password";
    } else if (!client.password) {
      // Scenario A part 2: Returning user, but they never finished setting a password
      client.fullName = fullName;
      client.phone = phone;
      await client.save();
      actionFlag = "set_password";
    } else {
      // Scenario B: Returning user who HAS a password
      actionFlag = "enter_password";
    }

    // 3. Create the booking
    const booking = await Booking.create({
      client: client._id,
      fullName,
      email,
      phone,
      serviceType,
      preferredDate,
    });

    // 4. Send back the booking ID and the Action Flag
    res.status(201).json({
      success: true,
      action: actionFlag,
      bookingId: booking._id,
      message: "Action required to secure booking",
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
