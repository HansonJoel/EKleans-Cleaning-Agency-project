const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    // NEW: We must tell Mongoose to include virtuals when converting data to JSON
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// NEW: Create a virtual property called 'bookings'
clientSchema.virtual("bookings", {
  ref: "Booking", // Look in the Booking model
  localField: "_id", // Match the Client's _id...
  foreignField: "client", // ...with the 'client' field in the Booking model
  justOne: false, // Return an array of all matches, not just one
});

module.exports = mongoose.model("Client", clientSchema);
