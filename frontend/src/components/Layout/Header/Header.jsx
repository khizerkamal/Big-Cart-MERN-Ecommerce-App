import React,{ useState } from 'react'
import { Route,Link,useHistory,useLocation } from 'react-router-dom'
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
    const history = useHistory();
    const location = useLocation();
    const { user,loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged Out Successfully.")
    }

    const gotoCartPage = () => {
        history.push('/cart')
    }

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.mobile}>
                <div className={styles.logo}>
                    <img src="/images/logo.svg" alt="logo" />
                    <span className={styles.logoBig}>Big</span>
                    <span className={styles.logoCart}>Cart</span>
                </div>
                <Link
                    to={{
                        pathname: `/login`,
                        state: { background: location }
                    }}
                >
                    <button className={styles.loginButtion}>
                        <span>Login</span>
                    </button>
                </Link>
                <button className={styles.cartWrapper} onClick={gotoCartPage} >
                    <img src="/images/shopping-cart.svg" alt="cart" />
                    <span className={styles.cartCount}>
                        {cartItems.length}
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
            {/* <Route render={({ history }) => <Search history={history} />} /> */}
            <Search />
            <div className={styles.desktop}>
                {user && !loading ? (
                    <>
                        <div
                            onMouseEnter={() => setShowDrawer(!showDrawer)}
                            onMouseLeave={() => setShowDrawer(!showDrawer)}
                            className={styles.userWrapper}
                        >
                            <span className={styles.username}>{user.name}</span>
                            <div className={styles.dropDownWrapper}>
                                <Avatar
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
                                            user && user.role === "admin" && (
                                                <>
                                                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                                        <button >
                                                            <img src="/images/dashboard.svg" alt="" />
                                                            <span>Dashboard</span>
                                                        </button>
                                                    </Link>
                                                    <hr />
                                                </>
                                            )
                                        }
                                        <Link to="/orders/me" style={{ textDecoration: "none" }}>
                                            <button >
                                                <img src="/images/order.svg" alt="" />
                                                <span>Orders</span>
                                            </button>
                                        </Link>
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
                    <Link
                        to={{
                            pathname: '/login',
                            state: { background: location }
                        }}
                    >
                        <button className={styles.loginButtion}>
                            <span>Login</span>
                        </button>
                    </Link>

                )}

                <button className={styles.cartWrapper} onClick={gotoCartPage}>
                    <img src="/images/shopping-cart.svg" alt="cart" />
                    <span className={styles.cartCount}>
                        {cartItems.length}
                    </span>
                </button>
            </div>
            {/* {showModal && <Login onClose={() => setShowModal(false)} />} */}
            {/* {showModal && <Route path='/login' component={Login} />} */}
        </div >
    )
}

export default Header
