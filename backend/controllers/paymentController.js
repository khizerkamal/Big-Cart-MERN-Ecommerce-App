const catchAsync = require('../utils/catchAsync')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsync(async (req,res,next) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: {integration_check: 'accept_a_payment'}
    })

    res.status(200).json({
        message: 'success',
        client_secret: paymentIntent.client_secret
    })
})

// Send Stripe API Key  =>   /api/v1/payment/stripeapi
exports.sendStripeApi = catchAsync(async (req,res,next) => {
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
})