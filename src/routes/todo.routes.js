const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");
const mongoose = require("mongoose");
const {
  createTodoSchema,
  updateTodoSchema,
} = require("../schemas/todo.schema");

router.post("/", async (req, res) => {
  const { data, success, error } = createTodoSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: "validation failed",
      details: error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  try {
    const createTodo = await Todo.create({
      title: data.title,
      description: data.description,
    });
    res.status(201).json({
      message: "TODO created successfully",
      todo: createTodo,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      if (req.query.completed === "true") {
        filter.completed = true;
      } else if (req.query.completed === "false") {
        filter.completed = false;
      } else {
        return res.status(400).json({
          error: "Invalid query parameter",
        });
      }
    }

    const todo = await Todo.find(filter);
    return res.status(200).json({
      todos: todo,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ID",
    });
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    return res.status(200).json({
      todo: todo,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Id not found",
    });
  }
  const { data, success, error } = updateTodoSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      error: "validation failed",
      details: error.issues.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedTodo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    return res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.patch("/:id/toggle", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ID",
    });
  }
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found",
      });
    }
    todo.completed = !todo.completed;
    await todo.save();
    return res.status(200).json({
      message: "Todo status updated successfully",
      todo: todo,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid ID",
    });
  }
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({
        error: "Todo delete unsuccessfully",
      });
    }
    return res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
