import React from 'react'
import { Route,Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import styles from './Cart.module.css'
import MetaData from '../MetaData'
import { addItemToCart,removeItemFromCart } from '../../../store/actions/cartActions'

const Cart = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const { cartItems } = useSelector(state => state.cart)
    const { isAuthenticated } = useSelector(state => state.auth)

    const increaseQty = (id,quantity,stock) => {
        const newQty = quantity + 1;
        if (newQty > stock) {
            alert.error("Stock Empty")
            return;
        }
        dispatch(addItemToCart(id,newQty));
    }

    const decreaseQty = (id,quantity) => {
        const newQty = quantity - 1;
        if (newQty <= 0) return;
        dispatch(addItemToCart(id,newQty));
    }

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const checkoutHandler = () => {
        if (isAuthenticated) {
            history.push('/shipping')
        } else {
            history.push('/login')
            alert.error("Login First")
        }
    }

    return (
        <>
            <MetaData title={"Your Cart"} />
            {cartItems.length === 0 ? (
                <div className={styles.emptyCartContainer}>
                    <img src="/images/emptyCart.png" alt="emptycart" />
                    <h1>OOPS!</h1>
                    <h2>Your Cart is Empty...</h2>
                </div>
            ): (
                <>
                    <div className={styles.container}>
                        <div className={styles.itemsSection}>
                            <h1 className={styles.myCart}>My Cart({cartItems.length})</h1>
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
                                                <h1 className={styles.price}>${item.price}</h1>
                                            </div>
                                            <div className={styles.qtyControlWrapper}>
                                                <button
                                                    onClick={() => decreaseQty(item.product,item.quantity)}
                                                    className={styles.subtractButton}
                                                >-</button>
                                                <span className={styles.quantity} id="count">{item.quantity}</span>
                                                <button
                                                    className={styles.addButton}
                                                    onClick={() => increaseQty(item.product,item.quantity,item.stock)}
                                                >+</button>
                                            </div>
                                            <img
                                                className={styles.removeImg}
                                                src="/images/bin.png"
                                                onClick={() => removeCartItemHandler(item.product)}
                                                alt="deleteItem"
                                            />
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
                                        </div>
                                        <div className={styles.rightMob}>
                                            <h2 className={styles.name}>{item.name}</h2>
                                            <div className={styles.rightBottom}>
                                                <div className={styles.qtyControlWrapper}>
                                                    <button
                                                        onClick={() => decreaseQty(item.product,item.quantity)}
                                                        className={styles.subtractButton}
                                                    >-</button>
                                                    <span className={styles.quantity} id="count">{item.quantity}</span>
                                                    <button
                                                        className={styles.addButton}
                                                        onClick={() => increaseQty(item.product,item.quantity,item.stock)}
                                                    >+</button>
                                                </div>
                                                <img
                                                    className={styles.removeImg}
                                                    src="/images/bin.png"
                                                    onClick={() => removeCartItemHandler(item.product)}
                                                    alt="deleteItem"
                                                />
                                            </div>
                                        </div>
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
                                <div>
                                    {
                                        cartItems.reduce((acc,item) => (acc + item.quantity * 1),0)
                                    } (Units)
                                </div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Shipping</div>
                                <div className={styles.sm}>TBD</div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Sales Tax</div>
                                <div className={styles.sm}>TBD</div>
                            </div>
                            <div className={styles.flexEnd}>
                                <div className={`${styles.bold} ${styles.lg}`}>Discount</div>
                                <div className={styles.sm}>$0</div>
                            </div>
                            <div className={`${styles.flexEnd} ${styles.total}`}>
                                <div className={styles.bold}>ESTIMATED TOTAL</div>
                                <div>
                                    ${
                                        cartItems.reduce((acc,item) =>
                                            (acc + item.quantity * item.price),0).toFixed(2)
                                    }
                                </div>
                            </div>
                            <button
                                className={styles.checkoutBtn}
                                onClick={checkoutHandler}
                            >
                                CHECKOUT
                            </button>
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
