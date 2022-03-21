// Author : Sai Rahul Kodumuru (B00875628)
const Stock = require('../models/Stock');

exports.findUser = async (req, res) => {
  try {
    const stocks = await Stock.find({});

    res.status(200).json({
      message: 'User found',
      stocks,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    });
  }
};
