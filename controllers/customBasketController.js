//Author : Shiv Gaurang Desai (B00862445)
const mongoose = require("mongoose");
const customBasketModel = require("../models/CustomBasketModel");

const getCustomBasket = async (req, res) => {
  try {
    customBasketModel
      .find()
      .exec()
      .then((result) => {
        console.log(result);
        return res.status(200).send(result);
      })
      .catch((e) => {
        console.log(e + "This is the error");
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
    });
  }
};

const addCustomBasket = async (req, res) => {
  try {
    const newModel = new customBasketModel({
      _id: new mongoose.Types.ObjectId(),
      basket_name: req.body.basket_name,
      description: req.body.description,
      age_group: req.body.age_group,
      confidence_level: req.body.confidence_level,
      market_symbol: req.body.market_symbol,
      visibility: req.body.visibility,
    });
    newModel
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Custom Basket Added to the database",
          status: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      Message: "Internal Server Error !!",
      Status: false,
      DetailMessage: err,
    });
  }
};

const deleteCustomBasket = async (req, res) => {
  const id = req.params.customBasketId;
  customBasketModel
    .remove({ _id: id })
    .exec()
    .then((result) => {
      console.log(result.deletedCount);
      if (result.deletedCount) {
        return res.status(200).json({
          status: true,
          message: "Custom Basket was deleted succesful",
        });
      } else {
        return res
          .status(400)
          .json({ status: false, message: "Custom basket was not found" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const getCustomBasketById = async (req, res) => {
  const id = req.params.customBasketId;
  customBasketModel.findById({ _id: id }).then((result) => {
    console.log(result);
    if (result === null) {
      return res.status(400).json({
        status: false,
        message: "Custom Basket with associated not found",
      });
    }
    return res.status(200).json(result);
  });
};

const getCustomBasketByVisibility = async (req, res) => {
  customBasketModel.find({ visibility: true }).then((result) => {
    console.log(result);
    if (result === null) {
      return res.status(400).json({
        status: false,
        message: "Custom Basket with associated not found",
      });
    }
    return res.status(200).json(result);
  });
};

module.exports = {
  getCustomBasket,
  addCustomBasket,
  deleteCustomBasket,
  getCustomBasketById,
  getCustomBasketByVisibility,
};
