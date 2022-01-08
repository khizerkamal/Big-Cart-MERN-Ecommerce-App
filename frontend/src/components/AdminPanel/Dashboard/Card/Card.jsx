import React from 'react'
import styles from '../Dashboard.module.css'
import { Link } from 'react-router-dom'
import { BsArrowRightCircle } from 'react-icons/bs';

const Card = ({ bg, title, amount, icon }) => {
    return (
        <div className={`
        ${styles.cardWrapper} 
        ${bg === "bg1" ? styles.bg1 : bg === "bg2" ? styles.bg2 : bg === "bg3" ? styles.bg3 : bg === "bg4" ? styles.bg4 : ""}`}>
            <div className={styles.cardContentWrapper}>
                <div className={styles.cardLeft}>
                    <h1>{amount}</h1>
                    <h3>{title}</h3>
                </div>
                <div className={styles.cardRight}>
                    {icon}
                </div>
            </div>
            <Link styles={{ textDecoration: "none" }}>
                <div className={styles.arrowIcon}>
                    <BsArrowRightCircle />
                </div>
            </Link>
        </div>
    )
}

export default Card
