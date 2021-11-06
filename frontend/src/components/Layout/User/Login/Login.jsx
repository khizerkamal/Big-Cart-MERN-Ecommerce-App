import React,{ useState,useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory,useLocation } from 'react-router-dom'

import styles from './Login.module.css'
import { login,clearErrors } from '../../../../store/actions/userActions'
import Signup from '../Signup/Signup'
import ForgotPassword from '../ForgotPassword/ForgotPassword'

const Login = () => {
    const [ email,setEmail ] = useState('')
    const [ password,setPassword ] = useState('')
    const [ signupModal,setSignupModal ] = useState(false)
    const [ forgotPasswordModal,setForgotPasswordModal ] = useState(false)
    const { isAuthenticated,error,loading } = useSelector(state => state.auth)

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    let back = e => {
        e.stopPropagation();
        history.goBack();
    };

    const redirect = location.search ? location.search.split('=')[ 1 ] : '/'
    // console.log(location.search) // ?redirect=shipping

    useEffect(() => {
        if (isAuthenticated) history.push(redirect);
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[ dispatch,alert,isAuthenticated,error,history ])

    const submit = (e) => {
        e.preventDefault();
        dispatch(login(email,password))
    }

    return (
        <div className={styles.modalMask}>
            <div className={`${styles.modalWrapper} ${signupModal ? styles.h70 : ''}`}>
                <div onClick={back} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </div>
                <div className={styles.left}>
                    <img src="/images/login.svg" alt="login" />
                </div>
                <div className={styles.right}>
                    <div className={`${signupModal || forgotPasswordModal ? styles.hide : ''}`}>
                        <h2>Login</h2>
                        <form onSubmit={submit} className={styles.form}>
                            <div className={styles.inputWrapper}>
                                <div className={styles.inputBox}>
                                    <img src="/images/envelope.svg" alt="user" />
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
                            <p
                                onClick={() => setForgotPasswordModal(true)}
                                className={styles.forgotPassword}
                            >
                                Forgot Password?
                            </p>
                            <div className={styles.loginButtonWrapper}>
                                <button type="submit" className={styles.loginButton}>
                                    {loading ? "Loading..." : "Login"}
                                </button>
                            </div>
                            <p
                                onClick={() => setSignupModal(true)}
                                style={{ textDecoration: "none" }}
                                className={styles.signup}
                            >
                                New to BigCart? Create an account
                            </p>
                        </form>
                    </div>
                    <div className={signupModal ? styles.displaySignup : styles.hide}>
                        <Signup />
                    </div>
                    <div className={forgotPasswordModal ? styles.displayFP : styles.hide}>
                        <ForgotPassword />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
