import React from 'react'

import styles from './Reviews.module.css'
import getDate from '../../../../GetDate/GetDate'

const Reviews = ({ reviews }) => {
    return (
        <div>
            <div className={styles.header}>
                <div className={styles.headerImgWrapper}>
                    <img src="/images/reviews.png" alt="reviews" />
                </div>
                <h1>ALL REVIEWS</h1>
            </div>
            {reviews.map(review => (
                <div className={styles.reviewWrapper}>
                    <div className={styles.reviewHeaderWrapper}>
                        <div className={styles.chip}>
                            <span>{review.rating}</span>
                            <img src="/images/star.png" alt="star" />
                        </div>
                        <h3>{review.name}</h3>
                    </div>
                    <p className={styles.comment}>{review.comment}</p>
                    <div className={styles.historyWrapper}>
                        <div className={styles.historyImgWrapper}>
                            <img src="/images/history.png" alt="history" />
                        </div>
                        <span>{getDate(review.createdAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Reviews
