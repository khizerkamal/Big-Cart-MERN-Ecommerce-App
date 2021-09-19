import React from 'react'
import styles from './Product.module.css'
import { Link } from 'react-router-dom'

const Product = ({ product, margin }) => {
    return (
        <Link style={{ textDecoration: "none" }} to={`/product/${product._id}`}>
            <div className={`${styles.container} ${margin ? styles.marginedContainer : ''}`}>
                <div className={styles.image}>
                    <img src={product.images[ 0 ].url} alt="" />
                </div>
                <div className={styles.logoWrapper}>
                    <img src="images/logo.svg" alt="logo" />
                    <span className={styles.logoBig}>Big</span>
                    <span className={styles.logoCart}>Cart</span>
                </div>
                <div className={styles.details}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <div className={`${styles.starsWrapper} ${styles.ratings}`}>
                        <div className={styles.ratingouter}>
                            <div className={styles.ratinginner} style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span className={styles.reviews}>({product.numOfReviews})</span>
                    </div>
                    <h3 className={styles.price}>Rs: {product.price}</h3>
                </div>
            </div>
        </Link>
    )
}

export default Product
