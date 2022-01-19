const Product = require('../models/productModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/APIFeatures')
const cloudinary = require('cloudinary')

exports.createProduct = catchAsync(async (req,res,next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'products'
        });

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    req.body.user = req.user.id;
    const newProduct = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product: newProduct
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

exports.getAdminProducts = catchAsync(async (req,res,next) => {
    const products = await Product.find();
    res.status(200).json({
        status: 'success',
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
    let product = await Product.findById(req.params.id)
    if (!product) {
        return next(new AppError('No Product found with this id',404));
    }

    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }
    if (images !== undefined) {
        // Deleting Product images from Cloudinary
        for (let i = 0; i < product.images.length; i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
        let imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'products'
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imagesLinks
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    })
})

exports.deleteProduct = catchAsync(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new AppError('No Product found with this id',404));
    }
    
    // Deleting Product images from Cloudinary
    for (let i = 0; i < product.images.length; i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    await product.remove();
    res.status(200).json({  // 204 -> no content
        success: true, //In REST arch. its a practice to not send any data in delete operation
    })
})

// ------------ REVIEWS ------------
// Create new review   =>   /api/v1/products/review
exports.createProductReview = catchAsync(async (req,res,next) => {
    const { rating,comment,productId } = req.body;
    const review = {
        date: Date.now(),
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc,item) => acc + item.rating,0) / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        success: true
    })
})

// Get Product Reviews   =>   /api/v1/products/review/:id
exports.getProductReviews = catchAsync(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete Product Review   =>   /api/v1/products/review/:id
exports.deleteProductReview = catchAsync(async (req,res,next) => {
    const product = await Product.findById(req.params.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.params.id.toString());
    const numOfReviews = reviews.length;
    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    await Product.findByIdAndUpdate(req.params.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})