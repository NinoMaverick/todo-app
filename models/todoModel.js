const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, 
{ timestamps: true}
);

// 🔹 Create a new task
todoSchema.statics.createTodo = async function (text, userId) {
  return await this.create({ text, user: userId });
};

// 🔹 Get all tasks for a user
todoSchema.statics.getTodosByUser = async function (userId) {
  return await this.find({ user: userId });
};

// 🔹 Update a task (ensures ownership)
todoSchema.statics.updateTodoIfOwner = async function (todoId, userId, updateData) {
  const todo = await this.findOneAndUpdate(
    { _id: todoId, user: userId }, // Ensure user owns the task
    updateData,
    { new: true }
  );
  
  if (!todo) throw new Error("Task not found or unauthorized");

  return todo;
};

// 🔹 Delete a task (ensures ownership)
todoSchema.statics.deleteIfOwner = async function (todoId, userId) {
  const todo = await this.findById(todoId);
  if (!todo) throw new Error("Task not found");

  if (todo.user.toString() !== userId) {
    throw new Error("Forbidden - You cannot delete this task");
  }

  await todo.deleteOne();
  return { message: "Task deleted successfully" };
};

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;