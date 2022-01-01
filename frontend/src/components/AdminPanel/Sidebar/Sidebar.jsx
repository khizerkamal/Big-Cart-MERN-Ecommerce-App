import React,{ useState,useEffect } from 'react';
import {useSelector} from 'react-redux'
import styles from './Sidebar.module.css'
import { BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill,BsSearch,BsBasket2,BsStar } from "react-icons/bs";
import { MdOutlineDashboard,MdOutlineCreateNewFolder } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { VscSaveAll } from "react-icons/vsc";


const Sidebar = () => {
    const [ inactive,setInactive ] = useState(true);
    const {user} = useSelector(state => state.auth)
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
                        <a className={`${styles.menuItem} ${styles.productBorder}`}>
                            <div className={styles.menuIcon}>
                                <RiProductHuntLine />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Products</p>
                        </a>
                        {/* <ul className={styles.subMenu}>
                            <li>
                                <a className={styles.menuItem}>
                                    <div>
                                        <VscSaveAll />
                                    </div>
                                    <p className={`${inactive ? styles.disable : styles.enable}`}>Show</p>
                                </a>
                            </li>
                            <li>
                                <a className={styles.menuItem}>
                                    <div>
                                        <MdOutlineCreateNewFolder />
                                    </div>
                                    <p className={`${inactive ? styles.disable : styles.enable}`}>Create</p>
                                </a>
                            </li>
                        </ul> */}
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
            <div className={styles.sidebarFooter}>
                <div className={styles.avatar}>
                    <img src={user.avatar.url} alt="avatar" />
                </div>
                <div className={`${inactive ? styles.disable : styles.userInfo}`}>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
