import React from 'react'
import styles from './ProductDetails.module.css'

const ProductDetails = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <img src="https://res.cloudinary.com/bookit/image/upload/v1614877995/products/61oXGZ60GfL_fixco9.jpg" alt="" />
            </div>
            <div className={styles.right}>
                <h2 className={styles.name}>CAN USB FD Adapter (GC-CAN-USB-FD)</h2>
                <span className={styles.productId}>Product # sklubdyv548dvs5</span>
                <div className={styles.ratingsWrapper}>
                    <img src="/images/star-filled.svg" alt="star-filled" />
                    <img src="/images/star-filled.svg" alt="star-filled" />
                    <img src="/images/star-filled.svg" alt="star-filled" />
                    <img src="/images/star-filled.svg" alt="star-filled" />
                    <img src="/images/star-filled.svg" alt="star-filled" />
                    <span className={styles.reviews}>(5 Reviews)</span>
                </div>
                <h1 className={styles.price}>Rs: 500.00</h1>
                <div className={styles.addToCartWrapper}>
                    <button className={styles.subtractButton}>-</button>
                    <span className={styles.quantity}>1</span>
                    <button className={styles.addButton}>+</button>
                    <button className={styles.AddProdButton}>
                        <img src="/images/shopping-cart.svg" alt="cart" />
                        Add to Cart
                    </button>
                </div>
                <div className={styles.statusWrapper}>
                    <h3>Status:<span className={styles.status}>In Stock</span></h3>
                </div>
                <div className={styles.descriptionWrapper}>
                    <span className={styles.descriptionHeading}>Description:</span>
                    <h3 className={styles.description}>Monitor a CAN network, write a CAN program and communicate with industrial, medical, automotive or other CAN based device. Connect CAN FD and CAN networks to a computer via USB with the CAN USB FD adapter.</h3>
                </div>
                <button className={styles.reviewBtn}>
                    Submit Your Review
                </button>
            </div>
        </div>
    )
}

export default ProductDetails
