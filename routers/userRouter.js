// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/user', userController.findUser);

module.exports = userRouter;
