import React, {useEffect, Fragment} from 'react'
import { useHistory,Link } from 'react-router-dom'
import Card from './Card/Card'
import { FaUsers } from 'react-icons/fa';
import { BsCartPlusFill, BsFillInboxesFill } from 'react-icons/bs';
import { AiOutlineStock } from 'react-icons/ai';
import styles from './Dashboard.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {allOrders} from '../../../store/actions/orderActions'
import {getProducts} from '../../../store/actions/productsAction'
import ModalLoader from '../../Layout/Loader/ModalLoader';


const Dashboard = () => {
    const dispatch = useDispatch();
    const {loading, orders} = useSelector(state => state.allOrder);
    const {products} = useSelector(state => state.products);
    let totalAmount = 0;
    orders && orders.forEach(order => totalAmount += order.totalPrice)
    let outOfStock = 0;
    products && products.forEach(product => {
        if(product.stock < 1) outOfStock +=1;
    })
    let pendingOrders = 0;
    orders && orders.forEach(order => {
        if(order.orderStatus === "Processing") pendingOrders +=1;
    })
    const cardData = [
        {   
            bg: "bg1",
            title: "Total Users",
            amount: "34",
            icon: <FaUsers />,
        },
        {   
            bg: "bg2",
            title: "Pending Orders",
            amount: pendingOrders,
            icon: <BsCartPlusFill />,
        },
        {   
            bg: "bg3",
            title: "Total Products",
            amount: products && products.length,
            icon: <BsFillInboxesFill />,
        },
        {   
            bg: "bg4",
            title: "Out of Stock",
            amount: outOfStock,
            icon: <AiOutlineStock />,
        }
        ,
        {   
            bg: "bg2",
            title: "Total Earning",
            amount: totalAmount.toFixed(2),
            icon: <BsCartPlusFill />,
        },
    ]
    useEffect(() => {
        dispatch(allOrders());
        dispatch(getProducts());
    }, [dispatch])

    return (
       <Fragment>
           {loading ? <div className="flex x-center y-center h-100">
                <ModalLoader />
           </div> : (
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
           )}        
       </Fragment>
    )
}

export default Dashboard
