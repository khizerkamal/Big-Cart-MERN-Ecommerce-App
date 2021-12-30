const express = require('express')
const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController')

const router = express.Router();

router.route('/new').post(authController.protect,orderController.newOrder)
router.route('/:id').get(authController.protect,orderController.getSingleOrder)
router.route('/me/:id').get(authController.protect, orderController.myOrders)


module.exports = router;