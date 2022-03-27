// Author : Sai Rahul Kodumuru (B00875628)
// Package Imports
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("./models/User");




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
// const portfolioRouter = require('./routers/portfolioRouter');

// App Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cors());



// Routes
app.use("/api", userRouter);
// app.use('/api', portfolioRouter);

// Welcome to API handler
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Stockverse API!!!',
  });
});

// Invalid Route Handler
app.get('*', (req, res) => {
  res.status(400).json({ success: false, message: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`-> Stockverse API is listening on: http://localhost:${PORT}`);
});
