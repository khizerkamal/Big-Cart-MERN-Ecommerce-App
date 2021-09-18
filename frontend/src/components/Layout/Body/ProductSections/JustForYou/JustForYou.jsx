import React,{ useState,useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import Product from '../../Product/Product';
import { getProducts } from '../../../../../store/actions/productsAction';
import Loader from '../../../Loader/Loader';
import { useAlert } from 'react-alert'
import Pagination from 'react-js-pagination'
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './JustForYou.module.css'

const JustForYou = () => {
    const [ currentPage,setCurrentPage ] = useState(1)
    const { loading,products,totalProducts,resPerPage,error } = useSelector(state => state.products)

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    const dispatch = useDispatch();
    const alert = useAlert();
    // Getting All Products from DB and Set in Redux
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProducts(currentPage));
    },[ dispatch,alert,error,currentPage ])
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
                            activePage={currentPage}
                            itemsCountPerPage={resPerPage}
                            totalItemsCount={totalProducts}
                            onChange={setCurrentPageNo}
                            nextPageText={'Next'}
                            prevPageText={'Prev'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default JustForYou
