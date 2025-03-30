const express = require("express");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to check authentication
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Create Task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text, user: req.user });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Error creating todo" });
  }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.user });
  res.json(todos);
});

// Update Tasks
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user }, // Ensures ownership
      req.body,
      { new: true }
    );
  
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found or unauthorized" });
    }
  
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});  

// Delete Task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    // Step 1: Find the task 
    const todo = await Todo.FindById(req.params,id);

    if(!todo) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Step 2: Check if the logged-in user owns the task
    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ error: "Unauthorized to delete this task" });
    }

    // Step 3: Delete the task
    await todo.deleteOne();
    res.json({ message: "Task deleted successfully "});
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
  
});

module.exports = router;