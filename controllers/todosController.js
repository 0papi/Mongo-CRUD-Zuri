const Todo = require("../models/todo");

// get all todos
// /todos
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    res.status(400);
    throw new Error("There are no todos to display");
  }

  res.json(todos);
};

// get single todo
// /todos/:id
const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  res.json(todo);
};

// create new Todo
// /todos
const createNewTodo = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    res.status(400);
    throw new Error("Please provide the title and description");
  }
  const todo = await Todo.create({ title, description });

  if (todo) {
    res.json(todo);
  }
};

// update todo
// /todos/:id
const updateTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("No ID has been provided");
  }
  if (!req.body) {
    res.status(400);
    throw new Error("Please provide all fields");
  }
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
};

// delete todo
// /todos/:id
const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndDelete(id);

  res.json(todo);
};

module.exports = {
  getTodos,
  getSingleTodo,
  createNewTodo,
  updateTodo,
  deleteTodo,
};
