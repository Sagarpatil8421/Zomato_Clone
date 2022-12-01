const express = require('express')
const paymentControlller = require('../controllers/payment')

const Router = express.Router();

Router.post('',paymentControlller.createOrder)
Router.post('/save',paymentControlller.saveTransaction)



module.exports=Router