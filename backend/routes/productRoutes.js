const express = require('express')
const productController = require('../controllers/productController')
const authController = require('../controllers/authController')

const router = express.Router();

router
    .route('/')
    // .get(authController.protect, productController.getAllProducts)
    .get(productController.getAllProducts)

router
    .route('/:id')
    .get(productController.getProduct)

router.delete('/review/:productId/:id', authController.protect,productController.deleteProductReview)

router
    .route('/review')
    .put(authController.protect,productController.createProductReview)
    // .delete(authController.protect,productController.deleteProductReview)

router
    .route('/review/:id')
    .get(authController.protect,productController.getProductReviews)

    
module.exports = router;

