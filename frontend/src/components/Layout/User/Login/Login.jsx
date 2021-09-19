import React,{ useState,useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Login.module.css'
import { login,clearErrors } from '../../../../store/actions/userActions'
import MetaData from '../../MetaData'
import Loader from '../../Loader/Loader'

const Login = ({ onClose }) => {
    const [ email,setEmail ] = useState('')
    const [ password,setPassword ] = useState('')
    const { isAuthenticated,error,loading } = useSelector(state => state.auth)

    const alert = useAlert();
    const dispatch = useDispatch();

    const submit = () => {
        // e.preventDefault();
        if (isAuthenticated) return onClose();
        dispatch(login(email,password))
        onClose();
    }

    useEffect(() => {
        if (isAuthenticated) return;
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    },[ dispatch,alert,isAuthenticated,error ])

    return (
        <div className={styles.modalMask}>
            <div className={styles.modalWrapper}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </div>
                <div className={styles.left}>
                    <img src="/images/login.svg" alt="login" />
                </div>
                <div className={styles.right}>
                    <h2>Login</h2>
                    <form className={styles.form}>
                        <div className={styles.inputWrapper}>
                            <div className={styles.inputBox}>
                                <img src="/images/user.svg" alt="user" />
                                <input
                                    type="text"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={styles.inputBox}>
                                <img src="/images/password.svg" alt="password" />
                                <input
                                    type="password"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <Link
                            onClick={onClose}
                            to="/user/forgotPassword"
                            style={{ textDecoration: "none" }}
                            className={styles.forgotPassword}
                        >
                            Forgot Password?
                        </Link>
                        <div className={styles.loginButtonWrapper}>
                            <button onClick={submit} className={styles.loginButton}>Login</button>
                        </div>
                        <Link
                            onClick={onClose}
                            to="/user/signup"
                            style={{ textDecoration: "none" }}
                            className={styles.signup}
                        >
                            New to BigCart? Create an account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
