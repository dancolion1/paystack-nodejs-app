const express = require('express');
const router = express.Router();
const initializePayment = require('../controllers/controllers');// import the controller


router.post('/acceptpayment', initializePayment.acceptPayment);

module.exports = router;