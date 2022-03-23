// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const {
  addToPortfolio,
  getAllPortfoliosByUserId,
} = require('../controllers/portfolioController');
const { getUserById } = require('../controllers/userController');

const portfolioRouter = express.Router();

portfolioRouter.param('userId', getUserById);

portfolioRouter.post('/portfolio/add/:userId', addToPortfolio);
portfolioRouter.get('/portfolios/:userId', getAllPortfoliosByUserId);

module.exports = portfolioRouter;
