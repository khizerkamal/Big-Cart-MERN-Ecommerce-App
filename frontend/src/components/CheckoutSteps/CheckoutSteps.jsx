import React from 'react'
import styles from './CheckoutSteps.module.css'
import { Link } from 'react-router-dom'

const CheckoutSteps = ({ shippingInfo,confirmOrder,payment }) => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                {shippingInfo ? <Link to='/shipping' style={{ textDecoration: 'none' }} >
                    <div className={styles.flexRow}>
                        <div className={`${styles.wrapper} ${styles.mr40}`}>
                            <img src="/images/delivery.png" alt="delivery" />
                            <span className={styles.activeSpan}>Shipping Info</span>
                        </div>
                        {confirmOrder ?
                            <div className={styles.nextimg}>
                                <img src="/images/next.png" alt="next" />
                            </div>
                            : <div className={styles.nextimg}>
                                <img src="/images/nextdis.png" alt="next" />
                            </div>
                        }
                    </div>
                </Link> : <Link to='#!' style={{ textDecoration: 'none' }} disabled>
                    <div className={styles.flexRow}>
                        <div className={`${styles.wrapper} ${styles.mr40}`}>
                            <img src="/images/deliverydis.png" alt="delivery" />
                            <span className={styles.disabledSpan}>Shipping Info</span>
                        </div>
                        <div className={styles.nextimg} >
                            <img src="/images/nextdis.png" alt="next" />
                        </div>
                    </div>
                </Link>}
                {confirmOrder ? <Link to='/order/confirm' style={{ textDecoration: 'none' }} >
                    <div className={styles.flexRow}>
                        <div className={`${styles.wrapper} ${styles.mr40} ${styles.ml40}`}>
                            <img src="/images/order.png" alt="order" />
                            <span className={styles.activeSpan}>Confirm Order</span>
                        </div>
                        {payment ?
                            <div className={styles.nextimg}>
                                <img src="/images/next.png" alt="next" />
                            </div>
                            : <div className={styles.nextimg}>
                                <img src="/images/nextdis.png" alt="next" />
                            </div>
                        }
                    </div>
                </Link> : <Link to='#!' style={{ textDecoration: 'none' }} disabled>
                    <div className={styles.flexRow}>
                        <div className={`${styles.wrapper} ${styles.mr40} ${styles.ml40}`}>
                            <img src="/images/orderdis.png" alt="order" />
                            <span className={styles.disabledSpan}>Confirm Order</span>
                        </div>
                        <div className={styles.nextimg}>
                            <img src="/images/nextdis.png" alt="next" />
                        </div>
                    </div>
                </Link>}
                {payment ? <Link to='/payment' style={{ textDecoration: 'none' }} >
                    <div className={`${styles.wrapper} ${styles.ml40}`}>
                        <img src="/images/payment.png" alt="payment" />
                        <span className={styles.activeSpan}>Payment</span>
                    </div>
                </Link> : <Link to='#!' style={{ textDecoration: 'none' }} disabled>
                    <div className={`${styles.wrapper} ${styles.ml40}`}>
                        <img src="/images/paymentdis.png" alt="payment" />
                        <span className={styles.disabledSpan}>Payment</span>
                    </div>
                </Link>}
            </div>
        </div>
    )
}

export default CheckoutSteps
