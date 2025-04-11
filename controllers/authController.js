const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const AppError = require("../utils/appError");
const User = require("../models/userModel");

// Signup Route
exports.signup = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Validation: Ensure required fields are provided
  if (!username || !email || !password) {
    return next(new AppError("All fields are required", 400)); // Pass error to global error handler
  }
  // Validation: Ensure password is at least 6 characters
  if (password.length < 6) {
    return next(new AppError("Password must be at least 6 characters long", 400));
  }
  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email already in use", 400));
  }
  // Create new user
  const user = new User({ username, email, password });
  await user.save();
  // Send response
  res.status(201).json({
    message: "User registered successfully",
  });
});

// Login Route
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid credentials", 401));
  }
  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, 
    process.env.JWT_SECRET, { expiresIn: "7d" });
  // Store token in HTTP-only cookie for security
  res.cookie("token", token, { httpOnly: true });
  // Send response with the token
  res.json({
    message: "Login successful",
    token,
  });

});

exports.protect = catchAsync(async (req, res, next) => {
  let token = req.cookies.token || 
              (req.headers.authorization && req.headers.authorization.split(" ")[1]);
  if (!token) {
    return next(new AppError(
      "You are not logged in! Please log in to get access.", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = { id: decoded.userId };
  
  next();
});

