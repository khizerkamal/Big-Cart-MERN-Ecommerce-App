import React,{ useState,useEffect } from 'react'
import styles from './UpdatePassword.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { updatePassword,clearErrors } from '../../../../store/actions/userActions';
import { UPDATE_PASSWORD_RESET } from '../../../../store/constants/userConstants'
import MetaData from '../../MetaData'

const UpdatePassword = ({ onClose }) => {
    const [ oldPassword,setOldPassword ] = useState('')
    const [ password,setPassword ] = useState('')

    const { error,loading,isUpdated } = useSelector(state => state.user)

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Password Changed Successfully");
            onClose();
        }
        dispatch({
            type: UPDATE_PASSWORD_RESET
        })
    },[ alert,error,dispatch,isUpdated,onClose ])

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('oldPassword',oldPassword);
        formData.set('password',password);
        dispatch(updatePassword(formData))
    }

    return (
        <div className={styles.modalMask}>
            <MetaData title="Update Password" />
            <div className={`${styles.modalWrapper} ${styles.h70}`}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </div>
                <div className={styles.right}>
                    <div className={styles.displaySignup}>
                        <div>
                            <h2>Update Password</h2>
                            <form className={styles.form} onSubmit={submit} encType='multipart/form-data'>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.inputBox}>
                                        <img src="/images/password.svg" alt="user" />
                                        <input
                                            type="password"
                                            placeholder="Enter Old Password"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <img src="/images/password.svg" alt="email" />
                                        <input
                                            type="password"
                                            placeholder="Enter New Password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.loginButtonWrapper}>
                                    <button
                                        type="submit"
                                        className={`${styles.loginButton} ${loading ? 'styles.loadingButton' : ''}`}
                                    >
                                        {loading ? "Loading..." : "Update"}
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

export default UpdatePassword
