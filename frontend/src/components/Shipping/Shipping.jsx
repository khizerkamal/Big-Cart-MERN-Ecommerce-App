import React,{ useState } from 'react'
import { Route,Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { countries } from 'countries-list'

import styles from './Cart.module.css'
import MetaData from '../MetaData'
import { addItemToCart,removeItemFromCart } from '../../../store/actions/cartActions'

const Shipping = () => {
    const countrieslist = Object.value(countries);
    // US: {
    //    name: United States(value),
    //    capital: ...,... }
    return (
        <div>
            
        </div>
    )
}

export default Shipping
