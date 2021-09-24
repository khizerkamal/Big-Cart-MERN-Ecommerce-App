import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Profile.module.css'
import MetaData from '../../MetaData'
import Loader from '../../Loader/Loader'

const Profile = () => {
    const { loading,user } = useSelector(state => state.auth)
    return (
        <>
            {
                loading ? <div><Loader /></div> : (
                    <>
                        <MetaData title="My Profile" />
                        <h1 className={styles.heading}>Your Profile</h1>
                        <div className={styles.container}>
                            <div className={styles.left}>
                                <img src={user.avatar && user.avatar.url} alt="avatar" />
                                <button className={styles.editProfileBtn}>Edit Profile</button>
                            </div>
                            <div className={styles.right}>
                                <h1>Full Name</h1>
                                <h3>{user.name}</h3>
                                <h1>Email Address</h1>
                                <h3>{user.email}</h3>
                                <h1>Joined On</h1>
                                <h3>{user.createdAt}</h3>
                                <button className={styles.cpbtn}>Change Password</button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Profile
