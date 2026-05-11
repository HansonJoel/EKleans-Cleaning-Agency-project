const mongoose = require("mongoose");

// connecting to MongoDB
const connectDB = async () => {
  try {
    // Look up the URI only when the function runs
    const mongoURL = process.env.MONGO_URI;

    if (!mongoURL) {
      throw new Error(
        "MONGO_URI is undefined. Check if your .env file is in the root folder.",
      );
    }

    await mongoose.connect(mongoURL);
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    // Exit the app if DB fails, otherwise the server runs in a broken state
    process.exit(1);
  }
};

module.exports = connectDB;
