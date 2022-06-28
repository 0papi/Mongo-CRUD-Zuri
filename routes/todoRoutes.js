const express = require("express");
const {
  getTodos,
  getSingleTodo,
  createNewTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");
const router = express.Router();

// get all todos
router.get("/todos", getTodos);

// get single todo
router.get("/todos/:id", getSingleTodo);

// create new todo
router.post("/todos", createNewTodo);

// update todo
router.patch("/todos/:id", updateTodo);

// delete todo
router.delete("/todos/:id", deleteTodo);

module.exports = router;
