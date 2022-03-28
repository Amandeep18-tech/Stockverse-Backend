// Author : Sai Rahul Kodumuru (B00875628)
const User = require('../models/User');
const mongoose = require('mongoose');
const debug = require('debug')('app:UserController');

exports.findUser = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      message: 'User found',
      user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};

exports.getUserById = (req, res, next, id) => {
  if (id.length < 12) {
    return res.status(400).json({
      success: false,
      message: 'Invalid user id',
    });
  }

  User.findById(mongoose.Types.ObjectId(id), (err, user) => {
    if (err || !user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    req.profile = { userId: user._id };
    next();
  });
};

// Author : Pallavi Cherukupalli (B00875628)
exports.getAllusers = async (req, res) => {
  try{
  const usersList = await User.find({});
  res.status(200).json({
    users: usersList,
    success: true
  });
  }catch (err) {
  res.status(500).json({
    message: err.message,
    success: false,
  });
  }
};
