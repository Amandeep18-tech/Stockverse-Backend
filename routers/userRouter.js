// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const registerController = require('../controllers/registerController');
const signInController = require('../controllers/signInController');

const userRouter = express.Router();

userRouter.post('/register',registerController.createUser);
userRouter.post('/signin', signInController.checkUser);

module.exports = userRouter;
