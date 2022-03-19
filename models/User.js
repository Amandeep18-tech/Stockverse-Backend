// Author : Sai Rahul Kodumuru (B00875628)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// User Model
const User = mongoose.model('User', userSchema);

module.exports = User;
