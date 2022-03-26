// Author : Shiv Gaurang Desai (B00862445)
const express = require("express");

const {
  addToPortfolio,
  getAllPortfoliosByUserId,
} = require("../controllers/portfolioController");
const { getUserById } = require("../controllers/userController");

const customBasketRouter = express.Router();

customBasketRouter.post("/portfolio/add/:userId", addToPortfolio);
customBasketRouter.get("/get", getAllPortfoliosByUserId);

module.exports = customBasketRouter;
