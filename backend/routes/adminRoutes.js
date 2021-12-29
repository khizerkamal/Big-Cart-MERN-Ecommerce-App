const express = require('express')
const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController')

const router = express.Router();

router
    .route('/allUsers')
    .get(authController.protect,authController.restrictTo('admin'),authController.allUsers)

router
    .route('/user/:id')
    .get(authController.protect,authController.restrictTo('admin'),authController.getUserDetails)
    .put(authController.protect,authController.restrictTo('admin'),authController.updateUser)
    .delete(authController.protect,authController.restrictTo('admin'),authController.deleteUser)

router
    .route('/orders')
    .get(authController.protect,authController.restrictTo('admin'),orderController.allOrders)
    .put(authController.protect,authController.restrictTo('admin'),orderController.updateOrder)
    .delete(authController.protect,authController.restrictTo('admin'),orderController.deleteOrder)

module.exports = router
