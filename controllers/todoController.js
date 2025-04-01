const Todo = require('../models/todoModel');
const mongoose = require("mongoose");

// Create a new todo
exports.createTodo = async (req, res) => {
  try {
    const { text } = req.body;   // Extract "text" from request body
    const userId = req.user.id;  // Get the authenticated user's ID from JWT


    if (!text) {
      return res.status(400).json({ message: "Text is required" }); 
    }

    // Ensure userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Call the Model to handle the actual creation
    const newTodo = await Todo.createTodo({ text, user: userId }); 
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all todos for a specific user
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.getTodosByUser(req.user.id);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a todo (Only the owner can update)
exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = 
    await Todo.updateTodoIfOwner(req.params.id, req.user.id, req.body);
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a todo (Only the owner can delete)
exports.deleteTodo = async (req, res) => {
  try {
    const result = await Todo.deleteIfOwner(req.params.id, req.user.id);
    res.status(204).send(result);
  } catch (error) {
    res.status(403).json({ message: error.message }); // 403 Forbidden for unauthorized action
  }
};