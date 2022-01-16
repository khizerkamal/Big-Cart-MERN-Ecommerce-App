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
    CREATE_PRODUCT_RESET,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAIL,
    SEARCH_PRODUCTS_REQUEST,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../constants/productConstants'

export const productReducer = (state = { products: [] },action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                totalProducts: action.payload.totalProducts
            }
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }
        case ALL_PRODUCTS_FAIL:
        case ADMIN_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const createProductReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.status,
                product: action.payload.product
            }
        case CREATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            case CREATE_PRODUCT_RESET:
                return {
                    ...state,
                    success: false
                }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} },action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}

export const searchProductReducer = (state = { searchedProducts: [] },action) => {
    switch (action.type) {
        case SEARCH_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: []
            }
        case SEARCH_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                totalProducts: action.payload.totalProducts,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case SEARCH_PRODUCTS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

// ------------------- REVIEW -------------------
export const newReviewReducer = (state = {},action) => {
    switch (action.type){
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            }       
        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false
            }       
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                error: action.payload
            }  
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}