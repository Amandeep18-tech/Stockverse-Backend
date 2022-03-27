// Author : Sai Rahul Kodumuru (B00875628)
const express = require('express');

const userController = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/user', userController.findUser);

// Author : Pallavi Cherukupalli (B00887062)
userRouter.get('/userList', userController.getAllusers);

module.exports = userRouter;
