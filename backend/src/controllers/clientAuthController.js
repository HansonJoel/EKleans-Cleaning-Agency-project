const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to generate tokens
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// @desc    Set password for a new/incomplete client
// @route   POST /api/clients/setup-password
exports.setupPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const client = await Client.findOne({ email: email.toLowerCase() });
    if (!client)
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    client.password = await bcrypt.hash(password, salt);
    await client.save();

    // Issue token
    res.status(200).json({ success: true, token: generateToken(client._id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Login existing client (From Portal OR Booking confirmation)
// @route   POST /api/clients/login AND /api/clients/confirm-booking-login
exports.clientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user AND ask for the password field
    const client = await Client.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!client) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 2. Compare the typed password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 3. Issue token
    res.status(200).json({ success: true, token: generateToken(client._id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
