const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true,'Please enter product name.' ],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters.']
    },
    price: {
        type: Number,
        required: [ true,'Please enter product price.' ],
        maxLength: [ 10,'Product Price cannot exceed 10 digits.' ],
        default: 0.0
    },
    description: {
        type: String,
        required: [ true,'Please enter product description.' ]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please select category for this product' ],
        enum: {
            values: [
                "Electronics",
                "Cameras",
                "Laptop",
                "Accessories",
                "Book",
                "Food",
                "Headphone",
                "Clothes/Shoes",
                "Beauty/Health",
                "Sports",
                "Outdoor",
                "Home"
            ],
            message: "Please select correct category for product"
        }
    },
    seller: {
        type: String,
        required: [ true,'Please enter product seller.']
    },
    stock: {
        type: Number,
        required: [ true,'Please enter product stock.' ],
        maxLength: [ 5,'product stock cannot exceed 5 digits' ],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            name: {
                type: String,
                required: [ true,'Please enter reviewer name.' ]
            },
            rating: {
                type: Number,
                required: [ true,'Please enter rating.' ]
            },
            comment: {
                type: String,
                required: [ true,'Please enter comment.' ]
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})


const Product = mongoose.model('Product',productSchema);
module.exports = Product