import React,{ useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useStripe,useElements,CardNumberElement,CardExpiryElement,CardCvcElement } from '@stripe/react-stripe-js'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import MetaData from '../../Layout/MetaData';
import CheckoutSteps from '../CheckoutSteps'
import styles from './Payment.module.css'
import { createOrder,clearErrors } from '../../../store/actions/orderActions'

const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}

const Payment = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const { user } = useSelector(state => state.auth);
    const { cartItems,shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    const order = {
        orderItems: cartItems,
        shippingInfo,
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[ dispatch,error,alert ])

    const submitHandler = async (e) => {
        e.preventDefault();
        // document.querySelector('loginButton').disabled = true;
        let res;
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            res = await axios.post('/api/v1/payment/process',paymentData,config);
            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) return;
            const result = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    }
                }
            })
            if (result.error) {
                alert.error(result.error.message);
                // document.querySelector('loginButton').disabled = false;
            } else {
                // The Payment is Processed or Not
                if (result.paymentIntent.status === 'succeeded') {
                    // Creating Order
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order));
                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }
        } catch (error) {
            // document.querySelector('loginButton').disabled = false;
            alert.error(error.response.data.message);
        }
    }
    return (
        <div className={styles.mainContainer}>
            <MetaData title="Payment" />
            <CheckoutSteps shippingInfo confirmOrder payment />
            <div className={styles.flexCenter}>
                <form onSubmit={submitHandler}>
                    <div className={styles.form}>
                        <div className={styles.headerWrapper}>
                            <img src="/images/paymenttitle.png" alt="" />
                            <h2>PAYMENT</h2>
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/cardnumber.png" alt="cardnumber" />
                            <CardNumberElement
                                type="text"
                                options={options}
                                className={styles.elements}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/cardexpiry.png" alt="cardexpiry" />
                            <CardExpiryElement
                                type="text"
                                options={options}
                                className={styles.elements}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/cvv.png" alt="cvv" />
                            <CardCvcElement
                                type="text"
                                options={options}
                                className={styles.elements}
                            />
                        </div>
                        <div className={styles.loginButtonWrapper}>
                            <button type="submit" className={styles.loginButton}>
                                PAY {` - ${orderInfo && orderInfo.totalPrice}`}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Payment
