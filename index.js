// Author : Sai Rahul Kodumuru (B00875628)
// Package Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// User Imports
const { PORT, DB_URL, DB_NAME } = require('./config');
// Initialize the App and DB
const app = express();
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`-> Connected to MongoDB on database: ${DB_NAME}\n`))
  .catch((err) => {
    console.log(`-> Failed to Connect to MongoDB with error: ${err.message}`);
  });

// Get the Routers
const userRouter = require('./routers/userRouter');

// App Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRouter);

// Welcome to API handler
app.get('/', (req, res) => {
  res.status(200).json({
    message:
      'Welcome to the API!!! Please follow the instructions in the README.md file.',
    success: true,
  });
});

// Invalid Route Handler
app.get('*', (req, res) => {
  res.status(400).json({ success: false, message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`-> Stockverse API is listening on: http://localhost:${PORT}`);
});
