import React,{ useState,useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch,useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styles from './Signup.module.css'
import { register,clearErrors } from '../../../../store/actions/userActions'
import MetaData from '../../MetaData'

const Signup = ({ onClose }) => {
    const [ user,setUser ] = useState({
        name: '',
        email: '',
        password: ''
    })
    const { name,email,password } = user;
    const [ avatar,setAvatar ] = useState('')
    const [ previewAvatar,setPreviewAvatar ] = useState('/images/user.png')

    const { isAuthenticated,error,loading } = useSelector(state => state.auth)

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();
        if (isAuthenticated) return history.goBack();
        if (!name || !email || !password || !avatar) {
            return alert.error("Please Fill All The Fields")
        }
        const formData = new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('password',password);
        formData.set('avatar',avatar);

        dispatch(register(formData))
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }

    const onChange = e => {
        if (e.target.name === 'avatar') {
            const file = e.target.files[ 0 ];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setAvatar(reader.result);
            }
        } else {
            setUser({ ...user,[ e.target.name ]: e.target.value })
        }
    }

    useEffect(() => {
        if (isAuthenticated) history.goBack();
    },[ isAuthenticated,onClose, history ])
    return (
        <div className={styles.right}>
            <MetaData title={'Register User'} />
            <div>
                <h2>SIGNUP</h2>
                <form className={styles.form} onSubmit={submit} encType='multipart/form-data'>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputBox}>
                            <img src="/images/user.svg" alt="user" />
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/envelope.svg" alt="email" />
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/password.svg" alt="password" />
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.avatarSection}>
                            <div className={`${styles.avatarWrapper} ${avatar ? styles.border : ''}`}>
                                <img className={styles.avatarImage} src={avatar ? avatar : previewAvatar} alt="avatar" />
                            </div>
                            <div>
                                <input
                                    onChange={onChange}
                                    id="avatarInput"
                                    name="avatar"
                                    type="file"
                                    className={styles.avatarInput}
                                    accept="images/*"
                                />
                                <label className={styles.avatarLabel} htmlFor="avatarInput">
                                    Select Your beautiful Avatar
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.loginButtonWrapper}>
                        <button
                            type="submit"
                            className={`${styles.loginButton} ${loading ? 'styles.loadingButton' : ''}`}
                        >
                            {loading ? "Loading..." : "Signup"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
