const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const clientRoutes = require("./routes/clientRoutes");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // Parse incoming JSON requests

app.use("/api/bookings", bookingRoutes);
app.use("/api/clients", clientRoutes);

// Basic route to test the server
app.get("/", (req, res) => {
  res.send("Ekleans API is running...");
});

// We will mount our booking routes here later!

module.exports = app;
