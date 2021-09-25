import React,{ useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './Profile.module.css'
import MetaData from '../../MetaData'
import Loader from '../../Loader/Loader'
import UpdateProfile from '../UpdateProfile/UpdateProfile'

const Profile = () => {
    const [ showModal,setShowModal ] = useState(false)
    const { loading,user } = useSelector(state => state.auth)
    return (
        <>
            {
                loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                    <>
                        <MetaData title="My Profile" />
                        <h1 className={styles.heading}>Your Profile</h1>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <img src={user.avatar && user.avatar.url} alt="avatar" />
                                <button
                                    onClick={() => setShowModal(true)}
                                    className={styles.editProfileBtn}
                                >
                                    Edit Profile
                                </button>
                            </div>
                            <div className={styles.right}>
                                <h1>Full Name</h1>
                                <h3>{user.name}</h3>
                                <h1>Email Address</h1>
                                <h3>{user.email}</h3>
                                <h1>Joined On</h1>
                                <h3>{String(user.createdAt).substring(0,10)}</h3>
                                <div className={styles.flexColumn}>
                                    {user.role !== 'admin' && (
                                        <button className={styles.mobtn}>My Orders</button>
                                    )}
                                    <button className={styles.cpbtn}>Change Password</button>
                                </div>
                            </div>
                        </div>
                        {showModal && <UpdateProfile onClose={() => setShowModal(false)} />}
                    </>
                )
            }
        </>
    )
}

export default Profile
