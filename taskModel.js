const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  age:Number,
  completed: Boolean,
});

module.exports = mongoose.model('Task', taskSchema);
