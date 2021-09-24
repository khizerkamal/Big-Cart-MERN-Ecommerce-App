import React,{ useState } from 'react'
import styles from './Header.module.css'
import { Route,Link } from 'react-router-dom'
import Search from './Search/Search'
import Login from '../User/Login/Login'

const Header = () => {
    const [ showModal,setShowModal ] = useState(false)
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
            {showModal && <Login onClose={() => setShowModal(false)} />}
        </div>
    )
}

export default Header
