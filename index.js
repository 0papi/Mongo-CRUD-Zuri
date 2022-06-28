const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Todo = require("./models/todo");

// set up mongo connect
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://evans:merntrial123@merncluseter.ckg8p.mongodb.net/mernapp?retryWrites=true&w=majority"
    );
    console.log("Mongo server started");
  } catch (error) {
    console.log(error);
  }
};

// invoke mongo server creator function
connectDB();

// invoke some middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create some routes

// get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  if (!todos) {
    res.status(400);
    throw new Error("There are no todos to display");
  }

  res.json(todos);
});

// get single todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  res.json(todo);
});

// create new todo
app.post("/todos", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please provide the text");
  }
  const todo = await Todo.create({ text: text });

  if (todo) {
    res.json(todo);
  }
});

app.listen(3000, () => {
  console.log("Serving running");
});
