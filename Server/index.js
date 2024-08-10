const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/Todo");

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test");

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findById(id)
    .then((todo) => {
      todo.done = !todo.done; // Toggle the done status
      return todo.save();
    })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({ task, done: false }) // Initialize with done: false
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
});

app.listen(3001, () => {
  console.log("Server is running on port http://localhost:3001");
});
