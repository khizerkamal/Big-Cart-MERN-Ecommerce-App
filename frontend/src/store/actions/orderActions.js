import axios from 'axios'

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_STATUS_REQUEST,
    ORDER_STATUS_SUCCESS,
    ORDER_STATUS_FAIL,
    CLEAR_ERRORS
} from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch,getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/order/new',order,config)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const myOrders = (id) => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/me/${id}`)
        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const orderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/order/${id}`)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const allOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST })
        const { data } = await axios.get('/api/v1/admin/orders')
        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateOrderStatus = (id, orderData) => async (dispatch) => {
    try {
        dispatch({type: ORDER_STATUS_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.patch(`/api/v1/admin/order/${id}`,orderData,config)
        console.log(data.success)

        dispatch({
            type: ORDER_STATUS_SUCCESS,
            payload: data.success,
        })
        
    } catch (error) {
        dispatch({
            type: ORDER_STATUS_FAIL,
            error: error.response.data.message
        })
    }
}

// CLear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS})
}