const express = require("express");
const authController = require("../controllers/authController");
const todoController = require("../controllers/todoController");
const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.use(protect); // Apply protect middleware to all routes below
router.post("/todos", todoController.createTodo);
router.get("/todos", todoController.getTodos);
router.patch("/todos/:id", todoController.updateTodo);
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
