const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authController = require('../controllers/authController');

// Protecting routes with authMiddleware
router.post('/', authController.protect, todoController.createTodo);
router.get('/', authController.protect, todoController.getTodos);
router.put('/:id', authController.protect, todoController.updateTodo);
router.delete('/:id', authController.protect, todoController.deleteTodo);

module.exports = router;
