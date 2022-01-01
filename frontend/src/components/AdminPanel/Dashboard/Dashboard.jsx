import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Dashboard.module.css'

const Dashboard = () => {
    const history = useHistory();
    const back = () => {
        history.push('/')
    }
    return (
        <div>
            <Header/>
            <Sidebar/>
        </div>
    )
}

export default Dashboard
