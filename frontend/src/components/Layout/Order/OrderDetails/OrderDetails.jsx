import React from 'react'
import {useHistory} from 'react-router-dom'
import styles from './OrderDetails.module.css'

const OrderDetails = ({ onClose, orderId}) => {
    return (
        <div className={styles.modalMask}>
            <div className={`${styles.modalWrapper}`}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/close.png" alt="close" />
                </div>
                
            </div>
        </div>
    )
}

export default OrderDetails
