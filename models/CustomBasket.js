// Author : Shiv Gaurang Desai
const mongoose = require("mongoose");

const customBasketSchema = new mongoose.Schema(
  {
    stock_name: String,
    stock_symbol: String,
    stock_sector: String,
    pe_ratio: Number,
    stock_market: String,
  },
  { collection: "custom_basket" } // Map to existing Collection Name or give a new name
);

// User Model
const CustomBasket = mongoose.model("CustomBasket", customBasketSchema);

module.exports = CustomBasket;
