import axios from 'axios'
import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAIL,
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

export const adminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST })
        const { data } = await axios.get(`/api/v1/admin/products`);
        dispatch({
            type:  ADMIN_PRODUCTS_SUCCESS,
            payload: data.products
        })       
    } catch (error) {
        dispatch({
            type:  ADMIN_PRODUCTS_FAIL,
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

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST })

        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }
        const {data} = await axios.post('/api/v1/admin/products', productData, config)
    
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
        
    }
}

// CLear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS})
}   