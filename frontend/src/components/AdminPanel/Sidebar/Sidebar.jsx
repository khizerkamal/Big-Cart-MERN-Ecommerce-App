import React,{ useState,useEffect } from 'react'
import styles from './Sidebar.module.css'
import { BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill,BsSearch,BsBasket2,BsStar } from "react-icons/bs";
import { MdOutlineDashboard } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";


const Sidebar = () => {
    const [ inactive,setInactive ] = useState(true);
    return (
        <div className={`${styles.sidebar} ${inactive ? styles.inactive : ""}`}>
            <div className={styles.topContent}>
                <div
                    onClick={() => setInactive(!inactive)}
                    className={styles.toggleMenuBtn}
                >
                    {inactive ? <BsFillArrowRightSquareFill />
                        : <BsFillArrowLeftSquareFill />}
                </div>
            </div>
            <div className={styles.searchController}>
                <button className={styles.searchBtn}>
                    <BsSearch />
                </button>
                <input type="text" placeholder="search" />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.mainMenu}>
                <ul>
                    <li className={styles.menuItemWrapper}>
                        <a className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <MdOutlineDashboard />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Dashboard</p>
                        </a>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <a className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <RiProductHuntLine />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Products</p>
                        </a>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <a className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <BsBasket2 />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Orders</p>
                        </a>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <a className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <FaUsers />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Users</p>
                        </a>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <a className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <BsStar />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Ratings</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
