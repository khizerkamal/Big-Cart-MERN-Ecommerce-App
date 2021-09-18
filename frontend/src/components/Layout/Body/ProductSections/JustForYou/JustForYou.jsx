import React,{ useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Product from '../../Product/Product';
import { getProducts } from '../../../../../store/actions/productsAction';
import Loader from '../../../Loader/Loader';
import { useAlert } from 'react-alert'
import styles from './JustForYou.module.css'
import { Pagination } from '@mui/material';

const JustForYou = ({ match }) => {
    const [ currentPage,setCurrentPage ] = useState(1)
    const { loading,products,totalProducts,resPerPage,error } = useSelector(state => state.products)
    const pages = Math.ceil(totalProducts / resPerPage);
    const handleChange = (event,value) => {
        setCurrentPage(value);
    };
    const keyword = match.params.keyword;
    const dispatch = useDispatch();
    const alert = useAlert();
    // Getting All Products from DB and Set in Redux
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(keyword,currentPage));
    },[ dispatch,alert,error,currentPage,keyword ])
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
                </div>
            )}
        </>
    )
}

export default JustForYou
