import React,{ useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './Profile.module.css'
import MetaData from '../../MetaData'
import Loader from '../../Loader/Loader'
import UpdateProfile from '../UpdateProfile/UpdateProfile'
import UpdatePassword from '../UpdatePassword/UpdatePassword'

const Profile = () => {
    const [ updateProfileModal,setUpdateProfileModal ] = useState(false)
    const [ updatePasswordModal,setUpdatePasswordModal ] = useState(false)
    const { loading,user } = useSelector(state => state.auth)
    return (
        <>
            <MetaData title="My Profile" />
            {
                loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                    <>
                        <div className={styles.container}>
                            <div className={styles.avatarWrapper}>
                                <img src={user.avatar && user.avatar.url} alt="avatar" />
                            </div>
                            <div className={styles.nameWrapper}>
                                <h3>{user.name}</h3>
                            </div>
                            <div className={styles.flexCenter}>
                                <div className={styles.emailWrapper}>
                                    <img src="/images/email.png" alt="" />
                                    <h3>{user.email}</h3>
                                </div>
                                <div className={styles.joinedOnWrapper}>
                                    <img src="/images/link.png" alt="" />
                                    <h3 className={styles.joinedOn}>Joined On:</h3>
                                    <h3 className={styles.joinedOnDate}>{String(user.createdAt).substring(0,10)}</h3>
                                </div>
                            </div>
                            <div className={styles.buttonsWrapper}>
                                <div className={styles.buttonsCenter}>
                                    <button
                                        onClick={() => setUpdateProfileModal(true)}
                                        className={styles.editProfileBtn}
                                    >
                                        Edit Profile
                                    </button>
                                    {user.role !== 'admin' && (
                                        <button className={styles.mobtn}>My Orders</button>
                                    )}
                                    <button
                                        className={styles.cpbtn}
                                        onClick={() => setUpdatePasswordModal(true)}
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                        {updateProfileModal && <UpdateProfile onClose={() => setUpdateProfileModal(false)} />}
                        {updatePasswordModal && <UpdatePassword onClose={() => setUpdatePasswordModal(false)} />}
                    </>
                )
            }
        </>
    )
}

export default Profile
