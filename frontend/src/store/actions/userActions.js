import axios from 'axios'
import {
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGIN_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants'

export const login = (email,password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/user/login',{ email,password },config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'   // Because of avatar of pic
            }
        }
        const { data } = await axios.post('/api/v1/user/signup',userData,config)
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST })
        const { data } = await axios.get('/api/v1/user/me')
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/user/logout')
        dispatch({
            type: LOGOUT_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }
}

// CLear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS})
}