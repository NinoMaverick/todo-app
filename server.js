const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app'); // Import app.js

// Load environment variables
dotenv.config();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    authSource: "admin", // Ensure authentication source is set
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// app.use("/api/auth", require("./routes/authRoutes"));



