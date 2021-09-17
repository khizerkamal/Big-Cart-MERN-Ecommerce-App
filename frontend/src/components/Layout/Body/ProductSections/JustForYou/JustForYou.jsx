import React from 'react'
import styles from './JustForYou.module.css'
import { useSelector } from 'react-redux';
import Product from '../../Product/Product';
import Loader from '../../../Loader/Loader';


const JustForYou = () => {
    const { loading,products } = useSelector(state => state.products)
    return (
        <>
            {loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                <div>
                    <div className={styles.headingWrapper}>
                        <h1 className={styles.heading}>All Products</h1>
                    </div>
                    <div className={styles.container}>
                        {
                            products && products.map(product => {
                                return <Product key={product._id} product={product} />
                            })
                        }
                        {
                            products && products.map(product => {
                                return <Product key={product._id} product={product} />
                            })
                        }
                        {
                            products && products.map(product => {
                                return <Product key={product._id} product={product} />
                            })
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default JustForYou
