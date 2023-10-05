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
  try {
    const newItem = new Task(req.body);
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const updatedItem = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedItem);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err);
    res.json({ message: "Something went wrong" });
  }
});

module.exports = router;
