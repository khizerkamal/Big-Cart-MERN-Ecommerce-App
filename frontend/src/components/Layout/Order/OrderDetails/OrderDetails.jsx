import React,{ useEffect } from 'react'
import { useHistory,Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import ModalLoader from '../../Loader/ModalLoader'
import MetaData from '../../MetaData'
import { orderDetails,clearErrors } from '../../../../store/actions/orderActions'
import styles from './OrderDetails.module.css'

const OrderDetails = ({ onClose,orderId }) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading,error,order = {} } = useSelector(state => state.orderDetail)
    const { shippingInfo,orderItems,paymentInfo,user,totalPrice,orderStatus, itemsPrice, shippingPrice, taxPrice } = order;

    useEffect(() => {
        dispatch(orderDetails(orderId));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[ dispatch,alert,error,orderId ])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`

    return (
        <div className={styles.modalMask}>
            <div className={`${styles.modalWrapper}`}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/cancel.png" alt="close" />
                </div>
                {loading ? <div className={styles.loaderWrapper}><ModalLoader /></div> : (
                    <div className={styles.absolute}>
                        <div className={styles.topBar}>
                            <h2>ORDER ID: {order._id}</h2>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <div className={styles.leftHeadingWrapper}>
                                    <img src="/images/information.png" alt="information" />
                                    <h3>SHIPPING INFORMATION</h3>
                                </div>
                                <div className={styles.leftContentWrapper}>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Name:</h3>
                                        <h3 className={styles.elementDetail}>{user && user.name}</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Phone#</h3>
                                        <h3 className={styles.elementDetail}>{shippingInfo && shippingInfo.phoneNo}</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Address:</h3>
                                        <h3 className={styles.elementDetail}>{shippingDetails}</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Items Cost:</h3>
                                        <h3 className={styles.elementDetail}>{itemsPrice && itemsPrice}$</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Tax:</h3>
                                        <h3 className={styles.elementDetail}>{taxPrice && taxPrice}$</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Shipping:</h3>
                                        <h3 className={styles.elementDetail}>{shippingPrice && shippingPrice}$</h3>
                                    </div>
                                    <div className={styles.leftContentElementWrapper}>
                                        <h3 className={styles.elementLabel}>Total:</h3>
                                        <h3 className={styles.elementDetail}>{totalPrice && totalPrice}$</h3>
                                    </div>
                                </div>
                                <div className={styles.leftHeadingWrapper}>
                                    <img src="/images/status.png" alt="information" />
                                    <h3>ORDER STATUS</h3>
                                </div>
                                <div className={styles.statusWrapper}>
                                    <p className={orderStatus === "Delivered" ? `${styles.green}` : `${styles.red}`}>
                                        {orderStatus}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.leftHeadingWrapper}>
                                    <img src="/images/items.png" alt="information" />
                                    <h3>ORDER ITEMS</h3>
                                </div>
                                <div className={styles.rightContentWrapper}>
                                    {
                                        orderItems && orderItems.map(item => (
                                            <div key={item.product} className={styles.prodWrapper}>
                                                <div className={styles.prodLeft}>
                                                    <img src={item.image} alt={item.name} />
                                                </div>
                                                <div className={styles.prodright}>
                                                    <div>
                                                        <Link
                                                            style={{
                                                                textDecoration: "none",
                                                                color: "black",
                                                                fontWeight: "bold",
                                                                textAlign: "center"
                                                            }}
                                                            to={`/product/${item.product}`}
                                                        >"{item.name}"
                                                        </Link>
                                                    </div>
                                                    <div className={styles.priceWrapper}>
                                                        <p>Price: {item.price}$</p>
                                                        <p>Qty: {item.quantity} pcs</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrderDetails
