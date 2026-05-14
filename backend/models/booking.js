const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please add a full name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
    },
    serviceType: {
      type: String,
      required: [true, "Please select a service type"],
      enum: ["post-construction", "move-in-out", "commercial"],
    },
    preferredDate: {
      type: Date,
      required: [true, "Please enter a date"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
