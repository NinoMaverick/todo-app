const express = require("express");
const cors = require("cors");
const morgan = require("morgan"); // For logging requests
// const helmet = require('helmet'); // Security middleware
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const todoRoutes = require('./routes/todoRoutes');
const globalErrorHandler = require("./controllers/errorController");

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // URL of your frontend during dev
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);   // For user authentication routes
app.use('/api/todos', todoRoutes);  // For todo management routes

// Test route
app.get("/", (req, res) => {
  res.send("Welcome to the To-Do App API 🚀");
});

// Global error handling middleware (MUST be after all routes)
app.use(globalErrorHandler);

module.exports = app;