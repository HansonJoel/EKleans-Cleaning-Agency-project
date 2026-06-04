const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // NEW: The relational link to the hidden Client account
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Please add a full name"],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      trim: true,
      lowercase: true,
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
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", bookingSchema);
