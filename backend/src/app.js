const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // Parse incoming JSON requests

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("Ekleans API is running...");
});

// We will mount our booking routes here later!

module.exports = app;
