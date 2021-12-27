const express = require('express')
const authController = require('../controllers/authController')
const orderController = require('../controllers/order')

const router = express.Router();

router.route('/new').post(authController.protect, orderController.newOrder)

module.exports = router;