const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Add CORS middleware
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Enable CORS

mongoose.connect('mongodb://127.0.0.1:27017/mongo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
