const express = require("express");
const router = express.Router();
const Task = require("./taskModel");

// Create a new task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send({ status: true, message: Success });
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: false, message: Failed });
  }
});

// Read all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description', 'series'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // This will run validators
    });

    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }

    res.status(200)
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send(); // Task not found
    }

    res.status(200).send({ message: "Task successfully deleted" }); // Success message
  } catch (error) {
    console.error(error);
    res.status(500).send(error); // Internal Server Error
  }
});

module.exports = router;
