const express = require('express')
const authController = require('../controllers/authController')


const router = express.Router();

router
    .route('/allUsers')
    .get(authController.protect,authController.restrictTo('admin'),authController.allUsers)

router
    .route('/user/:id')
    .get(authController.protect,authController.restrictTo('admin'),authController.getUserDetails)
    .put(authController.protect,authController.restrictTo('admin'),authController.updateUser)
    .delete(authController.protect,authController.restrictTo('admin'),authController.deleteUser)

module.exports = router
