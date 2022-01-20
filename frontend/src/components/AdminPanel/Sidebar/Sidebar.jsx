import React,{ useState,useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill,BsSearch,BsBasket2,BsStar } from "react-icons/bs";
import { MdOutlineDashboard,MdOutlineCreateNewFolder } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { VscSaveAll } from "react-icons/vsc";


const Sidebar = ({ onCollapse }) => {
    const [ inactive,setInactive ] = useState(true);
    const [ expand,setExpand ] = useState(false)
    const { user,loading } = useSelector(state => state.auth)

    const expandFunc = () => {
        if (inactive === true) return;
        setExpand(!expand);
    }

    return (
        <div className={`${styles.sidebar} ${inactive ? styles.inactive : ""}`}>
            <div className={styles.topContent}>
                <div
                    onClick={() => {
                        setInactive(!inactive)
                        if (!inactive) setExpand(false)
                        onCollapse(inactive);
                    }}
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
                        <Link to={"/admin/dashboard"} className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <MdOutlineDashboard />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Dashboard</p>
                        </Link>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <a
                            onClick={expandFunc}
                            className={`${styles.menuItem} ${styles.productBorder}`}
                        >
                            <div className={styles.menuIcon}>
                                <RiProductHuntLine />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Products</p>
                        </a>
                        <ul className={`${styles.subMenu} ${expand ? styles.active : ""}`}>
                            <li>
                                <Link to={"/admin/products"} className={styles.menuItemExpand}>
                                    <div>
                                        <VscSaveAll />
                                    </div>
                                    <p className={`${inactive ? styles.disable : styles.enable}`}>Show</p>
                                </Link >
                            </li>
                            <li>
                                <Link to={"/admin/products/create"} className={styles.menuItemExpand}>
                                    <div>
                                        <MdOutlineCreateNewFolder />
                                    </div>
                                    <p className={`${inactive ? styles.disable : styles.enable}`}>Create</p>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <Link to={"/admin/orders"} className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <BsBasket2 />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Orders</p>
                        </Link>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <Link to={"/admin/users"} className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <FaUsers />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Users</p>
                        </Link>
                    </li>
                    <li className={styles.menuItemWrapper}>
                        <Link to={"/admin/ratings"} className={styles.menuItem}>
                            <div className={styles.menuIcon}>
                                <BsStar />
                            </div>
                            <p className={`${inactive ? styles.disable : styles.enable}`}>Ratings</p>
                        </Link >
                    </li>
                </ul>
            </div>
            {user && !loading && (
                <div className={styles.sidebarFooter}>
                    <div className={styles.avatar}>
                        <img src={user.avatar && user.avatar.url} alt="avatar" />
                    </div>
                    <div className={`${inactive ? styles.disable : styles.userInfo}`}>
                        <h3>{user.name && user.name}</h3>
                        <p>{user.email && user.email}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Sidebar
