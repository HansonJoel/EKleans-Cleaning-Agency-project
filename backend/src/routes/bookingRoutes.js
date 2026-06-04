const express = require("express");
const router = express.Router();

// Import our controller functions
const {
  createBooking,
  getBookings,
} = require("../controllers/bookingController");

// Map the routes to the controller functions
// Note: The base path '/api/bookings' will be set in app.js
router
  .route("/")
  .post(createBooking) // Handles POST requests from the landing page
  .get(getBookings); // Handles GET requests from the admin dashboard

module.exports = router;
