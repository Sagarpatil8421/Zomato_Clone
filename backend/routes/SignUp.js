const express = require('express')

const signUpController = require('../controllers/signUp')

const Router = express.Router();

Router.post('/signup',signUpController.addUser)
Router.post('/login',signUpController.loginUser)

module.exports = Router