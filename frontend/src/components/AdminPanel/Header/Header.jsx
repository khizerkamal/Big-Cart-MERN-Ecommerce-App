import React from 'react'
import styles from './Header.module.css'
import {useHistory} from 'react-router-dom'
import { RiPictureInPictureExitLine } from "react-icons/ri";

const Header = () => {
    const history = useHistory();
    const back = () => {
        history.push('/')
    }
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src="/images/logo.svg" alt="logo" />
            </div>
            <div className={styles.headerHeadingWrapper}>
                <img src="/images/analytics.png" alt="analytics" />
                <h1 className={styles.headerHeading}>
                    WELCOME TO BIGCART ADMIN PANEL
                </h1>
            </div>
            <button onClick={back} className={styles.exitBtn}>
                <div className={styles.exitBtnImg}>
                    <RiPictureInPictureExitLine />
                </div>
                Exit
            </button>
        </div>
    )
}

export default Header
