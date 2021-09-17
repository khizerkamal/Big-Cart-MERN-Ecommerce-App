import React from 'react'

import { navData } from '../../../../constants/data'
import styles from './Navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.component}>
            {navData.map(el => (
                <div key={el._id} className={styles.container}>
                    <img className={styles.image} src={el.url} alt="" />
                    <h3 className={styles.text}>{el.text}</h3>
                </div>
            ))}
        </div>
    )
}

export default Navbar
