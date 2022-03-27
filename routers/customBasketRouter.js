// Author : Shiv Gaurang Desai (B00862445)
const express = require("express");

const {
  getCustomBasket,
  addCustomBasket,
  deleteCustomBasket,
  getCustomBasketById,
  getCustomBasketByVisibility,
} = require("../controllers/customBasketController");

const customBasketRouter = express.Router();

customBasketRouter.get("/getCustomBasketList", getCustomBasket);
customBasketRouter.post("/addCustomBasket", addCustomBasket);
customBasketRouter.delete(
  "/deleteCustomBasket/:customBasketId",
  deleteCustomBasket
);
customBasketRouter.get(
  "/getCustomBasketById/:customBasketId",
  getCustomBasketById
);
customBasketRouter.get(
  "/getCustomBasketByVisibility",
  getCustomBasketByVisibility
);

customBasketRouter.use("*", (req, res) => {
  res.status(400).json({ success: false, message: "Page not found" });
});

module.exports = customBasketRouter;
