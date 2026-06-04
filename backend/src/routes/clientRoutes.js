// src/routes/clientRoutes.js
const express = require("express");
const router = express.Router();

const { getClients } = require("../controllers/clientController");

// Map the GET request to the controller function
router.route("/").get(getClients);

module.exports = router;
