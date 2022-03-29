//Author : Sai Rahul Kodumuru (B00875628)
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
const debug = require('debug')('app:PortfolioController');
const CONSTANTS = require('../utils/constants');
const axios = require('axios');

const finalData = [
  {
    _id: '623b4a3546db488cc70a5464',
    userId: '623fcb4036fe9031dcfd696e',
    instrumentName: 'RELIANCE INDUSTRIES LTD',
    instrumentSymbol: 'RELIANCE.BSE',
    instrumentType: 'equity',
    instrumentRegion: 'India/Bombay',
    currency: 'INR',
    buyQuantity: 25,
    avgBuyPrice: 2500,
    createdAt: '2022-03-23T16:26:29.061Z',
    updatedAt: '2022-03-23T16:26:29.061Z',
    __v: 0,
    investmentValue: 82500,
    currentValue: 64447.4975,
    profitLoss: 1947.4974999999977,
    changePercent: '0.7293%',
    open: '2577.8999',
  },
  {
    _id: '6240d495fc12eb52dfa3cd2b',
    userId: '623fcb4036fe9031dcfd696e',
    instrumentName: 'Wipro India',
    instrumentSymbol: 'WIPRO.BSE',
    instrumentType: 'Equity',
    instrumentRegion: 'India/Bombay',
    currency: 'INR',
    buyQuantity: 100,
    avgBuyPrice: 20,
    createdAt: '2022-03-27T21:18:13.008Z',
    updatedAt: '2022-03-27T21:18:13.008Z',
    __v: 0,
    investmentValue: 2000,
    currentValue: 61085,
    profitLoss: 59085,
    changePercent: '-1.1787%',
    open: '611.4000',
  },
  {
    _id: '6240d603fc12eb52dfa3cd30',
    userId: '623fcb4036fe9031dcfd696e',
    instrumentName: 'Etherum',
    instrumentSymbol: 'ETH.INR',
    instrumentType: 'Crypto',
    instrumentRegion: 'Indian Rupee',
    currency: 'INR',
    buyQuantity: 2,
    avgBuyPrice: 1092,
    createdAt: '2022-03-27T21:24:19.928Z',
    updatedAt: '2022-03-27T21:24:19.928Z',
    __v: 0,
    investmentValue: 2184,
    currentValue: 505193.2864,
    profitLoss: 503009.2864,
    changePercent: 0.47911641102665264,
    open: '251392.18200000',
  },
];

exports.getPortfolioRecord = async (req, res) => {
  try {
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    if (req.params.recordId.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid record id',
      });
    }

    const data = await Portfolio.findOne({
      _id: req.params.recordId.trim(),
      userId: req.profile.userId,
    });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Incorrect portfolio id for userId',
      });
    }

    return res.status(200).json({
      success: true,
      data,
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

    // const data = response.map(async (portfolio) => {
    //   let response;
    //   if (portfolio.instrumentType.toLowerCase() === 'Equity'.toLowerCase()) {
    //     response = await getInstrumentData(portfolio.instrumentSymbol);
    //   } else {
    //     response = await getInstrumentDataCrypto(
    //       portfolio.instrumentSymbol,
    //       portfolio.currency.toUpperCase()
    //     );
    //   }

    //   // post getting the info from the API
    //   if (response.status) {
    //     const investmentValue = portfolio.avgBuyPrice * portfolio.buyQuantity;
    //     const { matchedItem } = response;
    //     const { close, open, changePercent } = matchedItem;
    //     const currentValue = parseFloat(close) * portfolio.buyQuantity;
    //     const profitLoss =
    //       parseFloat(currentValue) - parseFloat(investmentValue);

    //     return await Object.assign(portfolio._doc, {
    //       investmentValue,
    //       currentValue,
    //       profitLoss,
    //       changePercent,
    //       open,
    //     });
    //   }
    // });

    debug('Testing local');
    // debug(data);

    // const finalData = await Promise.all(data);

    return res.status(200).json({
      success: true,
      data: finalData,
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

exports.getPortfolioDateMap = async (req, res) => {
  try {
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    const response = await Portfolio.find({ userId: req.profile.userId });

    const dateMap = {
      today: 0,
      last30Days: 0,
      last90Days: 0,
    };

    response.forEach((portfolio) => {
      const { createdAt } = portfolio;
      const today = new Date();
      const creationDate = new Date(createdAt);
      const last30Days = new Date(today.setDate(today.getDate() - 30));
      const last90Days = new Date(today.setDate(today.getDate() - 90));

      if (creationDate.getTime() > last30Days.getTime()) {
        dateMap.last30Days += 1;
      } else if (creationDate.getTime() > last90Days.getTime()) {
        dateMap.last90Days += 1;
      } else {
        dateMap.today += 1;
      }
    });

    return await res.status(200).json({
      success: true,
      data: dateMap,
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

exports.deletePortfolioRecord = async (req, res) => {
  try {
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    if (req.params.recordId.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid portfolio id',
      });
    }

    const response = await Portfolio.findOneAndDelete({
      _id: req.params.recordId,
      userId: req.profile.userId,
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'No Portfolio record found for the userId',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Portfolio entry deleted successfully',
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

exports.updatePortfolioRecord = async (req, res) => {
  try {
    if (!req.profile.userId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user id',
      });
    }

    //check if the recordId is 12 char length
    if (req.params.recordId.length < 12) {
      return res.status(400).json({
        success: false,
        message: 'Invalid record id',
      });
    }

    if (Object.keys(req.body).length === 0 || req.body === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
      });
    }

    const data = await Portfolio.findOneAndUpdate(
      {
        _id: req.params.recordId,
        userId: req.profile.userId,
      },
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Invalid portfolio id for given userId',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Portfolio entry updated successfully',
      data,
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

// All other helper functions
const getInstrumentData = async (symbol) => {
  try {
    // handle USA
    let redefinedSymbol = symbol;
    const country = symbol.split('.')[1];
    if (country === 'USA') redefinedSymbol = symbol.replace('.USA', '');

    const url = CONSTANTS.GLOBAL_QUOTE(redefinedSymbol);
    // debug(url);
    const response = await axios.get(url);
    const { data } = await response;
    const matchedItem = await data['Global Quote'];
    // debug(matchedItem);

    if (matchedItem) {
      matchedItem.close = matchedItem['08. previous close'];
      matchedItem.open = matchedItem['02. open'];
      matchedItem.changePercent = matchedItem['10. change percent'];
      return { status: true, matchedItem };
    } else {
      throw new Error('No Match Found');
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};

const getInstrumentDataCrypto = async (symbol, currency) => {
  try {
    const [cryptoCoin, country] = symbol.split('.');

    const url = CONSTANTS.CRYPTO_CURRENCY_DAILY(cryptoCoin, country);
    // debug(url);
    const response = await axios.get(url);
    const { data } = await response;
    const matchedItem = await data['Time Series (Digital Currency Daily)'];
    const [firstKey] = Object.keys(matchedItem);
    const latestObject = matchedItem[firstKey];

    if (latestObject) {
      if (
        currency === 'USD' ||
        currency === undefined ||
        currency === '' ||
        currency === null
      ) {
        latestObject.close = latestObject['4b. close (USD)'];
        latestObject.open = latestObject['1b. open (USD)'];
      } else {
        latestObject.close = latestObject[`4a. close (${currency})`];
        latestObject.open = latestObject[`1a. open (${currency})`];
      }

      // calculate change percent
      const changePercent =
        ((parseFloat(latestObject.close) - parseFloat(latestObject.open)) /
          parseFloat(latestObject.open)) *
        100;

      latestObject.changePercent = changePercent || '0.00';

      // debug(latestObject);

      return { status: true, matchedItem: latestObject };
    } else {
      throw new Error('No Match Found for the given crypto');
    }
  } catch (e) {
    return { status: false, message: e.message };
  }
};
