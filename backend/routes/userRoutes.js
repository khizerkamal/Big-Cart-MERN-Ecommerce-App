const express = require('express')
const authController = require('../controllers/authController')


const router = express.Router();

router
    .route('/signup')
    .post(authController.signup)
router
    .route('/login')
    .post(authController.login)
router.get('/logout',authController.protect,authController.logout)

router.post('/forgotPassword',authController.forgotPassword)
router.put('/resetPassword/:token',authController.resetPassword)

router.get('/me',authController.protect,authController.getUserProfile)
router.put('/updatePassword',authController.protect,authController.updatePassword)
router.put('/updateProfile', authController.protect, authController.updateProfile)


module.exports = router;