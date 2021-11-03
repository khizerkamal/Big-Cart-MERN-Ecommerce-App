import React,{ useState,useEffect } from 'react'
import styles from './ForgotPassword.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { useHistory } from 'react-router-dom'
import { forgotPassword,clearErrors } from '../../../../store/actions/userActions';
import MetaData from '../../MetaData'

const ForgotPassword = () => {
    const [ email,setEmail ] = useState('')

    const { error,message,loading } = useSelector(state => state.forgotPassword)

    const alert = useAlert();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
            console.log(message)
            history.goBack();
        }
    },[ alert,error,message,dispatch,history ])

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('email',email);
        dispatch(forgotPassword(formData))
    }

    return (
        <div className={styles.right}>
            <MetaData title={'Register User'} />
            <div>
                <h2>Forgot Password</h2>
                <form className={styles.form} onSubmit={submit} encType='multipart/form-data'>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputBox}>
                            <img src="/images/user.svg" alt="user" />
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className={styles.loginButtonWrapper}>
                        <button
                            type="submit"
                            className={`${styles.loginButton} ${loading ? 'styles.loadingButton' : ''}`}
                        >
                            {loading ? "Loading..." : "Send Email"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword
