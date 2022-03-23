//Author : Sai Rahul Kodumuru (B00875628)
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
const debug = require('debug')('app:PortfolioController');

exports.addToPortfolio = async (req, res) => {
  try {
    // no user id handling
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    // create a newPortfolio object
    const newPortfolio = req.body;
    newPortfolio.userId = req.profile.userId;

    const response = await Portfolio.create(newPortfolio);
    res.status(201).json({
      success: true,
      data: response,
    });
  } catch (err) {
    debug(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      err: err.message,
    });
  }
};

exports.getAllPortfoliosByUserId = async (req, res) => {
  try {
    // no user id handling
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    const response = await Portfolio.find({ userId: req.profile.userId });
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (err) {
    debug(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      err: err.message,
    });
  }
};
