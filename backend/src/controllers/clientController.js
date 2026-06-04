const Client = require("../models/Client");

// @desc    Get all clients with their booking history
// @route   GET /api/clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().populate("bookings");

    const clientData = clients.map((client) => {
      return {
        id: client._id,
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        totalBookings: client.bookings.length,
        bookingHistory: client.bookings,
      };
    });

    res.status(200).json({
      success: true,
      count: clients.length,
      data: clientData,
    });
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
