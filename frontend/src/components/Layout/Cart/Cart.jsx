import React,{ useState,useEffect } from 'react'
import { Route,Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import styles from './Cart.module.css'
import MetaData from '../MetaData'

const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { cartItems } = useSelector(state => state.cart)
    return (
        <>
            <MetaData title={"Your Cart"} />
            {cartItems.length === 0 ? <h2>Your cart is empty</h2> : (
                <>
                    <div className={styles.container}>
                        <div className={styles.itemsSection}>
                            <h1 className={styles.myCart}>My Cart({cartItems.length})</h1>
                            {cartItems.map(item => (
                                <div className={styles.productWrapper}>
                                    <div className={styles.itemWrapper}>
                                        <div className={styles.imageWrapper}>
                                            <img className={styles.image} src={item.image} alt="product" />
                                        </div>
                                        <h2 className={styles.name}>{item.name}</h2>
                                        <div className={styles.priceWrapper}>
                                            <h1 className={styles.price}>${item.price}</h1>
                                        </div>
                                        <div className={styles.qtyControlWrapper}>
                                            <button className={styles.subtractButton}>-</button>
                                            <span className={styles.quantity} id="count">1</span>
                                            <button className={styles.addButton}>+</button>
                                        </div>
                                        <img className={styles.removeImg} src="/images/bin.png" alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartSummaryWrapper}>
                            <h1 className={styles.summary}>SUMMARY</h1>
                            <div className={styles.promoWrapper}>
                                <h3>Do you have a promo code?</h3>
                                <form className={styles.searchBox}>
                                    <input
                                        type="text"
                                        className={styles.searchInput}
                                        placeholder="Enter Promo Code"
                                    />
                                    <button className={styles.promoBtn}>Apply</button>
                                </form>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.subTotal}`}>SUBTOTAL</div>
                                <div>$9876</div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Shipping</div>
                                <div className={styles.sm}>$68</div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Sales Tax</div>
                                <div className={styles.sm}>$67</div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Discount</div>
                                <div className={styles.sm}>$0</div>
                            </div>
                            <div className={`${styles.flexEnd} ${styles.total}`}>
                                <div className={styles.bold}>ESTIMATED TOTAL</div>
                                <div>$9876</div>
                            </div>
                            <button className={styles.checkoutBtn}>CHECKOUT</button>
                            <div className={styles.helpWrapper}>
                                <h3 className={styles.help}>Need help? Call us at 1-000-000</h3>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Cart
