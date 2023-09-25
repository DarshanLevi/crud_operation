const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  games: String,
  completed: Boolean
});

module.exports = mongoose.model('Task', taskSchema);
