import axios from 'axios'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const getProducts = (currentPage, limit) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        // let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${limit}&price[lte]=${price[ 1 ]}
        // &price[gte]=${price[ 0 ]}`
        const { data } = await axios.get(`/api/v1/products?page=${currentPage}&limit=${limit}`)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })       
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/v1/products/${id}`)
        dispatch({
            type:  PRODUCT_DETAILS_SUCCESS,
            payload: data.product
        })       
    } catch (error) {
        dispatch({
            type:  PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const searchedProducts = (currentPage=1, limit, keyword='', price, category, ratings=0 ) => async (dispatch) => {
    try {
        dispatch({ type: SEARCH_PRODUCTS_REQUEST })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${limit}
        &price[lte]=${price[ 1 ]}&price[gte]=${price[ 0 ]}&ratings[gte]=${ratings}`
        if (category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&limit=${limit}
            &price[lte]=${price[ 1 ]}&price[gte]=${price[ 0 ]}&category=${category}&ratings[gte]=${ratings}`
        }
        const { data } = await axios.get(link)
        dispatch({
            type: SEARCH_PRODUCTS_SUCCESS,
            payload: data
        })       
    } catch (error) {
        dispatch({
            type: SEARCH_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// CLear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS})
}