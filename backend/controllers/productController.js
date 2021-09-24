const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/APIFeatures')

exports.createProduct = catchAsync(async (req,res,next) => {
    req.body.user = req.user.id;
    const newProduct = await Product.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            product: newProduct
        }
    })
})

exports.getAllProducts = catchAsync(async (req,res,next) => {
    const productCount = await Product.countDocuments();
    const features = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        
    let products = await features.query;
    let filteredProductsCount = products.length;
    
    features.paginate();
    products = await features.query;

    res.status(200).json({
        status: 'success',
        result: products.length,
        totalProducts: productCount,
        filteredProductsCount,
        products
    })
})

exports.getProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new AppError('No Product found with this id', 404))
    }
    res.status(200).json({
        status: 'success',
        product
    })

})

exports.updateProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // To get back updated data
        runValidators: true, //to run validators specified in schema
      })

    if (!product) {
        return next(new AppError('No Product found with this id',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            product
        }
    })
})

exports.deleteProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new AppError('No Product found with this id',404));
    }

    res.status(204).json({
        // 204 -> no content
        status: 'success',
        data: null  //In REST arch. its a practice to not send any data in delete operation
    })

})