const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();  
    
    res.status(201).json({ 
        message: "User registered successfully" 
    });
} catch (error) {
  res.status(400).json({ 
    error: "User registration failed" 
    });
}
});

// Login Route
router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, 
        process.env.JWT_SECRET, { expiresIn: "7d" });
        
        //Stores the token in an HTTP-only cookie for security
        res.cookie("token", token, { httpOnly: true }); 

        //Sends a success response with the token
        res.json({ message: "Login successful", token });
    

    } catch (error) {
        res.statusCode("500").json({ error: "Login failed" });
    }
})

module.exports = router;