import React,{ useState,useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch,useSelector } from 'react-redux'

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

    const submit = () => {
        // e.preventDefault();
        if (isAuthenticated) return onClose();
        const formData = new formData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('password',password);
        formData.set('avatar',avatar);

        dispatch(register(formData))
        onClose();
    }

    function selectImage(e) {
        const file = e.target.files[ 0 ];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            // console.log(reader.result)
            setAvatar(reader.result);
            // dispatch(setAvatar(reader.result))
        }
    }

    useEffect(() => {
        if (isAuthenticated) return;
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    },[ dispatch,alert,isAuthenticated,error ])
    return (
        <div className={styles.right}>
            <div>
                <h2>Signup</h2>
                <form className={styles.form}>
                    <div className={styles.inputWrapper}>
                        <div className={styles.inputBox}>
                            <img src="/images/user.svg" alt="user" />
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                value={user.name}
                                onChange={e => setUser.name(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/password.svg" alt="password" />
                            <input
                                type="password"
                                placeholder="Enter Your Email"
                                value={user.email}
                                onChange={e => setUser.email(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <img src="/images/password.svg" alt="password" />
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                value={user.password}
                                onChange={e => setUser.password(e.target.value)}
                            />
                        </div>
                        <div className={styles.avatarSection}>
                            <div className={`${styles.avatarWrapper} ${avatar ? styles.border : ''}`}>
                                <img className={styles.avatarImage} src={avatar ? avatar : previewAvatar} alt="avatar" />
                            </div>
                            <div>
                                <input onChange={selectImage} id="avatarInput" type="file" className={styles.avatarInput} />
                                <label className={styles.avatarLabel} htmlFor="avatarInput">
                                    Select Your beautiful Avatar
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.loginButtonWrapper}>
                        <button onClick={submit} className={styles.loginButton}>Signup</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
