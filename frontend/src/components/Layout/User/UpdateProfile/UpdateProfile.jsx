import React,{ useState,useEffect } from 'react'
import styles from './UpdateProfile.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { updateProfile,loadUser,clearErrors } from '../../../../store/actions/userActions';
import { UPDATE_PROFILE_RESET } from '../../../../store/constants/userConstants'
import MetaData from '../../MetaData'

const UpdateProfile = ({ onClose }) => {
    const [ name,setName ] = useState('')
    const [ email,setEmail ] = useState('')
    const [ avatar,setAvatar ] = useState('')
    const [ previewAvatar,setPreviewAvatar ] = useState('/images/user.png')

    const { user } = useSelector(state => state.auth)
    const { error,loading,isUpdated } = useSelector(state => state.user)

    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPreviewAvatar(user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("user updated Successfully");
            dispatch(loadUser());
            onClose();
        }
        dispatch({
            type: UPDATE_PROFILE_RESET
        })
    },[ user,alert,error,dispatch,isUpdated,onClose ])

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name);
        formData.set('email',email);
        formData.set('avatar',avatar);
        dispatch(updateProfile(formData))
    }

    const onChange = e => {
        const file = e.target.files[ 0 ];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setAvatar(reader.result);
        }
    }

    return (
        <div className={styles.modalMask}>
            <MetaData title="Update Profile" />
            <div className={`${styles.modalWrapper} ${styles.h70}`}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </div>
                <div className={styles.right}>
                    <div className={styles.displaySignup}>
                        <div>
                            <div className={styles.imgWrapper}>
                                <img src="/images/edit.png" alt="" />
                            </div>
                            <h2 className={styles.heading}>UPDATE PROFILE</h2>
                            <form className={styles.form} onSubmit={submit} encType='multipart/form-data'>
                                <div className={styles.inputWrapper}>
                                    <div className={styles.inputBox}>
                                        <img src="/images/user.svg" alt="user" />
                                        <input
                                            type="text"
                                            placeholder="Enter Your Name"
                                            name="name"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.inputBox}>
                                        <img src="/images/envelope.svg" alt="email" />
                                        <input
                                            type="text"
                                            placeholder="Enter Your Email"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
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

export default UpdateProfile
