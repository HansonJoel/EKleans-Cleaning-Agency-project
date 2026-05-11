require("dotenv").config(); // Load environment variables first
console.log("Check URI:", process.env.MONGO_URI); // Should not be undefined
const app = require("./app");
const connectDB = require("./config/db.js");

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB()
  .then(() => {
    // Start server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database. Server not started.", err);
  });
