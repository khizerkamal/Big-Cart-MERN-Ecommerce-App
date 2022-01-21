const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const mongoose = require('mongoose')

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsync(async (req,res,next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;
    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        status: 'success',
        order
    })
})

// Get Single Order => /api/v1/orders/:id
exports.getSingleOrder = catchAsync(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate('user','name email')
    if (!order) {
        return next(new AppError('No Order found with this ID', 404))
    }
    res.status(200).json({
        status: "success",
        order
    })
})

// Get Loggedin user Orders => /api/v1/orders/me
exports.myOrders = catchAsync(async (req,res,next) => { 
    const orders = await Order.find({ user: req.user.id })
    if (!orders) {
        return next(new AppError("No Orders Found", 404))
    }
    res.status(200).json({
        status: "success",
        orders
    })
})

// Get all Orders - adminRoutes => /api/v1/admin/orders
exports.allOrders = catchAsync(async (req,res,next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })
    res.status(200).json({
        status: "success",
        totalAmount,
        orders
    })
})

// Update Status of Order - adminRoutes => /api/v1/admin/order/:id
exports.updateOrder = catchAsync(async (req,res,next) => {
    const order = await Order.findById(req.params.id);
    if (order.orderStatus === 'delivered') {
        return next(new AppError("This Order has already been delivered.", 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product,item.quantity);
    })
    order.orderStatus = req.body.status;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        status: "success"
    })
})

async function updateStock(id,qty){
    const product = await Product.findById(id);
    product.stock = product.stock - qty;
    await product.save({ validateBeforeSave: false});
}

// Delete Order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsync(async (req,res,next) => {
    const order = await Order.findById(req.params.id)
    if (!order) {
        return next(new AppError('No Order found with this ID', 404))
    }
    await order.remove();
    res.status(200).json({
        status: "success",
    })
})