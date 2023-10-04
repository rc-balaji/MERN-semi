const express = require("express");
const Task = require("../models/model");

const router = express.Router();

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/tasks", async (req, res) => {
  const task = new Task({
    text: req.body.text,
  });
  try {
    const newTask = await task.save();
    res.json(newTask);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedText = req.body.text;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.json({ message: "Task not found" });
    }
    task.set({ text: updatedText });
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const result = await Task.deleteOne({ _id: taskId });
    if (result.deletedCount === 0) {
      return res.json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Something went wrong" });
  }
});

module.exports = router;
