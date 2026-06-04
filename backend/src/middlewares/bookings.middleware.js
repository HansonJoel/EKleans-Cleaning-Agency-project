const validator = require("validator");

const validateBookingRequest = (req, res, next) => {
  const { fullName, email, phone, serviceType, preferredDate } = req.body;
  let errors = [];

  // 1. Validate Full Name
  if (!fullName || validator.isEmpty(fullName.trim())) {
    errors.push("Please add a full name.");
  }

  // 2. Validate Email
  if (!email || !validator.isEmail(email)) {
    errors.push("Please provide a valid email address.");
  }

  // 3. Validate Phone
  if (!phone || !validator.isMobilePhone(phone, "any")) {
    errors.push("Please provide a valid phone number.");
  }

  // 4. Validate Service Type
  const validServices = ["post-construction", "move-in-out", "commercial"];
  if (!serviceType || !validator.isIn(serviceType, validServices)) {
    errors.push("Please select a valid service type.");
  }

  // 5. Validate Preferred Date (Must exist and not be in the past)
  if (!preferredDate) {
    errors.push("Please enter a preferred date.");
  } else {
    const dateEntered = new Date(preferredDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    if (dateEntered < today) {
      errors.push("Preferred date cannot be in the past.");
    }
  }

  // If there are errors, stop the request and send a 400 response
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: errors.join(" "),
    });
  }

  // If everything is valid, pass the request to the controller
  next();
};

module.exports = {
  validateBookingRequest,
};
