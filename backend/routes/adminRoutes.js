const express = require('express')
const authController = require('../controllers/authController')
const orderController = require('../controllers/orderController')
const productController = require('../controllers/productController')

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

router
    .route('/order/:id')
    .patch(authController.protect,authController.restrictTo('admin'),orderController.updateOrder)
    .delete(authController.protect,authController.restrictTo('admin'),orderController.deleteOrder)

router
    .route('/products')
    .get(authController.protect,authController.restrictTo('admin'),productController.getAdminProducts)
    .post(authController.protect,authController.restrictTo('admin'),productController.createProduct)

router
    .route('/products/:id')
    .patch(authController.protect, authController.restrictTo('admin'), productController.updateProduct)
    .delete(authController.protect, authController.restrictTo('admin'), productController.deleteProduct)


module.exports = router
