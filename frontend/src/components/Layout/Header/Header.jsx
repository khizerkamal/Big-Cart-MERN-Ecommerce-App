import React from 'react'
import styles from './Header.module.css'

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.mobile}>
                <div className={styles.logo}>
                    <span className={styles.logoBig}>Big</span>
                    <span className={styles.logoCart}>Cart</span>
                </div>
                <button className={styles.loginButtion}>
                    Login
                </button>
                <button className={styles.cartWrapper}>
                    <i class="fi-rr-shopping-cart"></i>
                    <span className={styles.cartCount}>
                        45
                    </span>
                </button>
            </div>
            <div className={`${styles.logo} ${styles.desktop}`}>
                <span className={styles.logoBig}>Big</span>
                <span className={styles.logoCart}>Cart</span>
            </div>
            <div className={styles.searchBox}>
                <img src="/images/search-icon.png" alt="search" />
                <input type="text" className={styles.searchInput} placeholder="Enter Product Name ..." />
            </div>
            <div className={styles.desktop}>
                <button className={styles.loginButtion}>
                    Login
                </button>
                <button className={styles.cartWrapper}>
                    <i class="fi-rr-shopping-cart"></i>
                    <span className={styles.cartCount}>
                        45
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Header
