import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SuccessPage.module.css'
import MetaData from '../../Layout/MetaData';

const SuccessPage = () => {
    return (
        <div className={styles.emptyCartContainer}>
            <MetaData title="Order Placed" />
            <img src="/images/success.png" alt="emptycart" />
            <h1>Your Order Has Been Placed<br /> Successfully!</h1>
            <Link to="/orders/me" style={{ textDecoration: "none" }}>Go to Orders</Link>
        </div>
    )
}

export default SuccessPage
