import React,{ useState } from 'react'
import { Route,Link,useHistory } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'

import { logout } from '../../../store/actions/userActions'
import Avatar from '@mui/material/Avatar';
import styles from './Header.module.css'
import Search from './Search/Search'
import Login from '../User/Login/Login'


const Header = () => {
    const [ showModal,setShowModal ] = useState(false);
    const [ showDrawer,setShowDrawer ] = useState(false)

    const dispatch = useDispatch();
    const alert = useAlert();
    const { user,loading } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged Out Successfully.")
    }

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.mobile}>
                <div className={styles.logo}>
                    <img src="images/logo.svg" alt="logo" />
                    <span className={styles.logoBig}>Big</span>
                    <span className={styles.logoCart}>Cart</span>
                </div>
                <button onClick={() => setShowModal(true)} className={styles.loginButtion}>
                    <span>Login</span>
                </button>
                <button className={styles.cartWrapper}>
                    <img src="/images/shopping-cart.svg" alt="cart" />
                    <span className={styles.cartCount}>
                        45
                    </span>
                </button>
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
                <div className={`${styles.logo} ${styles.desktop}`}>
                    <img src="images/logo.svg" alt="logo" />
                    <span className={styles.logoBig}>Big</span>
                    <span className={styles.logoCart}>Cart</span>
                </div>
            </Link>
            <Route render={({ history }) => <Search history={history} />} />
            <div className={styles.desktop}>
                {user && !loading ? (
                    <>
                        <div className={styles.userWrapper}>
                            <span className={styles.username}>{user.name}</span>
                            <div className={styles.dropDownWrapper}>
                                <Avatar
                                    onMouseEnter={() => setShowDrawer(!showDrawer)}
                                    alt="avatar"
                                    src={user.avatar && user.avatar.url}
                                    className={styles.avatar}
                                />
                                <div
                                    onMouseLeave={() => setShowDrawer(!showDrawer)}
                                    className={`${styles.drp_box} ${showDrawer ? styles.open : ''}`}
                                >
                                    <div className={styles.listWrapper}>
                                        <Link to="/user/me" style={{ textDecoration: "none" }}>
                                            <button >
                                                <img src="/images/profile.svg" alt="" />
                                                <span>Profile</span>
                                            </button>
                                        </Link>
                                        <hr />
                                        {
                                            user && user.role !== "admin" ? (
                                                <Link to="/orders/me" style={{ textDecoration: "none" }}>
                                                    <button >
                                                        <img src="/images/order.svg" alt="" />
                                                        <span>Orders</span>
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                                    <button >
                                                        <img src="/images/dashboard.svg" alt="" />
                                                        <span>Dashboard</span>
                                                    </button>
                                                </Link>
                                            )
                                        }
                                        <hr />
                                        <Link
                                            to="/"
                                            style={{ textDecoration: "none" }}
                                            onClick={logoutHandler}
                                        >
                                            <button>
                                                <img src="/images/logout.svg" alt="" />
                                                <span>Log Out</span>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : !loading && (
                    <button onClick={() => setShowModal(true)} className={styles.loginButtion}>
                        <span>Login</span>
                    </button>
                )}

                <button className={styles.cartWrapper}>
                    <img src="/images/shopping-cart.svg" alt="cart" />
                    <span className={styles.cartCount}>
                        45
                    </span>
                </button>
            </div>
            {showModal && <Login onClose={() => setShowModal(false)} />}
        </div >
    )
}

export default Header
