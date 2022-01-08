import React,{ useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert'
import { Pagination } from '@mui/material';

import Product from '../../Product/Product';
import { getProducts } from '../../../../../store/actions/productsAction';
import Loader from '../../../Loader/Loader';
import styles from './JustForYou.module.css'


const JustForYou = ({ match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const [ currentPage,setCurrentPage ] = useState(1)

    const { loading,products,totalProducts,error } = useSelector(state => state.products)

    const resPerPage = 6;
    let pages = 0;

    if (totalProducts) {
        pages = Math.ceil(totalProducts / resPerPage);
    }

    const handleChange = (event,value) => {
        setCurrentPage(value);
    };

    // Getting All Products from DB and Set in Redux
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(currentPage,resPerPage));
    },[ dispatch,alert,error,currentPage,resPerPage ])

    return (
        <>
            {loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                <>
                    <div className={styles.headingWrapper}>
                        <h1 className={styles.heading}>All Products</h1>
                    </div>
                    <div className={styles.container}>
                        {
                            products && products.map(product => {
                                return <Product margin={false} key={product._id} product={product} />
                            })
                        }
                    </div>
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            count={pages}
                            page={currentPage}
                            onChange={handleChange}
                            showFirstButton={true}
                            showLastButton={true}
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default JustForYou
