const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // For logging requests
// const helmet = require('helmet'); // Security middleware
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require("./utils/errorHandler");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do App API 🚀");
});

// Global error handling middleware (MUST be after all routes)
app.use(errorHandler);

module.exports = app;