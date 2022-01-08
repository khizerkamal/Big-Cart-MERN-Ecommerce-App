import React from 'react'
import { useHistory,Link } from 'react-router-dom'
import Card from './Card/Card'
import styles from './Dashboard.module.css'
import { cardData } from './Data/CardData';


const Dashboard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.cardsWrapper}>
                {cardData.map(card => (
                    <Card
                        bg={card.bg}
                        title={card.title}
                        amount={card.amount}
                        icon={card.icon}
                    />
                ))}
            </div>
        </div>
    )
}

export default Dashboard
