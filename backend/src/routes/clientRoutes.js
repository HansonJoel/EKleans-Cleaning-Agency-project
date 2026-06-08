// src/routes/clientRoutes.js
const express = require("express");
const router = express.Router();

const { getClients } = require("../controllers/clientController");
const {
  setupPassword,
  clientLogin,
} = require("../controllers/clientAuthController");

// Map the POST requests to the controller functions
router.route("/setup-password").post(setupPassword);
router.route("/login").post(clientLogin);
router.route("/confirm-booking-login").post(clientLogin);

// Map the GET request to the controller function
router.route("/").get(getClients);

module.exports = router;
