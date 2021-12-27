import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './ConfirmOrder.module.css'
import MetaData from '../../Layout/MetaData';
import CheckoutSteps from '../CheckoutSteps'

const ConfirmOrder = () => {
    const { cartItems,shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const history = useHistory();
    const itemsPrice = cartItems.reduce((acc,item) => acc + item.price * item.quantity,0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const proceedToCheckout = () => {
        const data = {
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        }
        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/order/payment')
    }

    return (
        <div className={styles.mainContainer}>
            <MetaData title="Confirm Order" />
            <CheckoutSteps shippingInfo confirmOrder />
            <div className={styles.container}>
                <div className={styles.itemsSection}>
                    <div className={styles.personalInfoWrapper}>
                        <h1 className={styles.myCart}>SHIPPING INFO</h1>
                        <div className={styles.flex}>
                            <div className={styles.flexleft}>
                                <h4>Name: </h4>
                                <h4>Phone# </h4>
                                <h4>Address: </h4>
                            </div>
                            <div className={styles.flexright}>
                                <h4>{user.name}</h4>
                                <h4>{shippingInfo.phoneNo}</h4>
                                <h4 className={styles.address}>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.country}</h4>
                            </div>
                        </div>
                    </div>
                    <h1 className={styles.myCart}>MY CART ITEMS: {cartItems.length}</h1>
                    {cartItems.map(item => (
                        <div className={styles.productWrapper} key={item.product}>
                            <div className={styles.itemWrapper}>
                                <div className={styles.left}>
                                    <div className={styles.imageWrapper}>
                                        <img className={styles.image} src={item.image} alt="product" />
                                    </div>
                                    <h2 className={styles.name}>{item.name}</h2>
                                </div>
                                <div className={styles.right}>
                                    <div className={styles.priceWrapper}>
                                        <h1 className={styles.price}>{item.quantity} x ${item.price} = ${item.quantity * item.price}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.mobile}>
                                <div className={styles.leftMob}>
                                    <div className={styles.imageWrapper}>
                                        <img className={styles.image} src={item.image} alt="product" />
                                    </div>
                                    <div className={styles.priceWrapper}>
                                        <h1 className={styles.price}>${item.price}</h1>
                                    </div>
                                    {/* <div className={styles.qtyControlWrapper}>
                                        <span className={styles.quantity} id="count">Qty: {item.quantity}</span>
                                    </div> */}
                                </div>
                                <div className={styles.rightMob}>
                                    <h2 className={styles.name}>{item.name}</h2>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.cartSummaryWrapper}>
                    <h1 className={styles.summary}>SUMMARY</h1>
                    <div className={styles.flexEnd}>
                        <div className={`${styles.bold} ${styles.subTotal}`}>SUBTOTAL</div>
                        <div>
                            {
                                cartItems.reduce((acc,item) => (acc + item.quantity * 1),0)
                            } (Units)
                        </div>
                    </div>
                    <div className={styles.flexEnd}>
                        <div className={`${styles.bold} ${styles.lg}`}>Items Price</div>
                        <div className={styles.sm}>{itemsPrice}</div>
                    </div>
                    <div className={styles.flexEnd}>
                        <div className={`${styles.bold} ${styles.lg}`}>Shipping</div>
                        <div className={styles.sm}>{shippingPrice}</div>
                    </div>
                    <div className={styles.flexEnd}>
                        <div className={`${styles.bold} ${styles.lg}`}>Sales Tax</div>
                        <div className={styles.sm}>{taxPrice}</div>
                    </div>
                    <div className={styles.flexEnd}>
                        <div className={`${styles.bold} ${styles.lg}`}>Discount</div>
                        <div className={styles.sm}>$0</div>
                    </div>
                    <div className={`${styles.flexEnd} ${styles.total}`}>
                        <div className={styles.bold}>TOTAL</div>
                        <div className={styles.bold}>{totalPrice}</div>
                    </div>
                    <button
                        className={styles.checkoutBtn}
                        onClick={proceedToCheckout}
                    >
                        Proceed to Payment
                    </button>
                    <div className={styles.helpWrapper}>
                        <h3 className={styles.help}>Need help? Call us at 1-000-000</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder
