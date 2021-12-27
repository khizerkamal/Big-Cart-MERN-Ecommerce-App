import React,{ useState } from 'react'
import { Route,Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { countries } from 'countries-list'

import styles from './Shipping.module.css'
import { saveShippingInfo } from '../../../store/actions/cartActions'
import MetaData from '../../Layout/MetaData';
import CheckoutSteps from '../CheckoutSteps'

const Shipping = () => {
    const countrieslist = Object.values(countries);  // US: {name: ..., capital: ..}
    const dispatch = useDispatch();
    const history = useHistory();

    const { shippingInfo } = useSelector(state => state.cart)
    const [ country,setCountry ] = useState(shippingInfo.country)
    const [ city,setCity ] = useState(shippingInfo.city)
    const [ address,setAddress ] = useState(shippingInfo.address)
    const [ postalCode,setPostalCode ] = useState(shippingInfo.postalCode)
    const [ phoneNo,setPhoneNo ] = useState(shippingInfo.phoneNo)

    const alert = useAlert();
    const submitHandler = (e) => {
        e.preventDefault();
        if (!country || !city || !address || !postalCode || !phoneNo) {
            return alert.error("All Fields are required");
        }
        dispatch(saveShippingInfo({ country,city,address,postalCode,phoneNo }));
        history.push('/order/confirm')
    }

    return (
        <div className={styles.container}>
            <MetaData title="Shipping Info" />
            <CheckoutSteps shippingInfo />
            <div className={styles.flexCenter}>
                <form onSubmit={submitHandler}>
                    <div className={styles.form}>
                        <div className={styles.headerWrapper}>
                            <img src="/images/truck.png" alt="" />
                            <h2>SHIPPING INFORMATION</h2>
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/country.png" alt="country" />
                            <select
                                type="text"
                                className={styles.country}
                                placeholder="Select Your Country"
                                value={country}
                                onChange={e => setCountry(e.target.value)}
                            >
                                {countrieslist.map(country => (
                                    <option key={country.name} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/city.png" alt="city" />
                            <input
                                type="text"
                                placeholder="Your City Name"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/address.png" alt="address" />
                            <input
                                type="text"
                                placeholder="Your Address"
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/postalCode.png" alt="postalCode" />
                            <input
                                type="text"
                                placeholder="Your Postal Code"
                                value={postalCode}
                                onChange={e => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/phoneNo.png" alt="phoneNo" />
                            <input
                                type="text"
                                placeholder="Your Phone No."
                                value={phoneNo}
                                onChange={e => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div className={styles.loginButtonWrapper}>
                            <button type="submit" className={styles.loginButton}>
                                CONTINUE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Shipping
