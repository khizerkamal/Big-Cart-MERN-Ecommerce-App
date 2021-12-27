import React,{ useState,useEffect } from 'react'
import styles from './ResetPassword.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { resetPassword,clearErrors,loadUser } from '../../../../store/actions/userActions';
import MetaData from '../../MetaData'
import { useParams,useHistory } from 'react-router'

const ResetPassword = () => {
    const [ password,setPassword ] = useState('')
    const [ confirmPassword,setConfirmPassword ] = useState('')

    const { error,success,loading } = useSelector(state => state.forgotPassword)
    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { token } = useParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            dispatch(loadUser());
            // history.push('/')
        }
    },[ alert,error,dispatch,success,history ])

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('password',password);
        formData.set('confirmPassword',confirmPassword);
        dispatch(resetPassword(token,formData))
    }

    return (
        <div className={styles.modalMask}>
            <MetaData title="New Password" />
            <div className={`${styles.modalWrapper} ${styles.h70}`}>
                <div className={styles.right}>
                    <div className={styles.displaySignup}>
                        <div>
                            <h2>New Password</h2>
                            <form className={styles.form} onSubmit={submit} encType='multipart/form-data'>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.inputBox}>
                                        <img src="/images/password.svg" alt="password" />
                                        <input
                                            type="password"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <img src="/images/password.svg" alt="password" />
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.loginButtonWrapper}>
                                    <button
                                        type="submit"
                                        className={`${styles.loginButton} ${loading ? 'styles.loadingButton' : ''}`}
                                    >
                                        {loading ? "Loading..." : "Set Password"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
