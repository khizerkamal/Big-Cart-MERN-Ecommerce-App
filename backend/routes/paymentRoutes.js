const express = require('express')
const authController = require('../controllers/authController')
const paymentController = require('../controllers/paymentController')


const router = express.Router();

router.post('/process',authController.protect,paymentController.processPayment)
router.get('/stripeapi', authController.protect, paymentController.sendStripeApi)

module.exports = router;