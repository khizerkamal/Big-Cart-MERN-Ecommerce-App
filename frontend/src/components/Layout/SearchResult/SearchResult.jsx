import React,{ useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { searchedProducts } from '../../../store/actions/productsAction'
import Loader from '../Loader/Loader'
import styles from './SearchResult.module.css'
import { Pagination } from '@mui/material';
import Product from '../Body/Product/Product';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const SearchResult = ({ match }) => {
    const [ currentPage,setCurrentPage ] = useState(1)
    const keyword = match.params.keyword;

    const { loading,products,totalProducts,error } = useSelector(state => state.searchedProducts)
    const resPerPage = 15;
    const pages = Math.ceil(totalProducts / resPerPage);
    const handleChange = (event,value) => {
        setCurrentPage(value);
    };

    const dispatch = useDispatch();
    const alert = useAlert();
    const [ price,setPrice ] = useState([ 1,1000 ])

    // Getting All Products from DB and Set in Redux
    useEffect(() => {
        // if (error) {
        //     return alert.error(error)
        // }
        dispatch(searchedProducts(currentPage,resPerPage,keyword,price));
    },[ dispatch,alert,error,currentPage,keyword,resPerPage,price ])
    return (
        <>
            {loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                <div>
                    <div className={styles.headingWrapper}>
                        <h1 className={styles.heading}>Your Searched {keyword} </h1>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.searchPanelWrapper}>
                            <Range
                                marks={{
                                    1: '$1',
                                    1000: '$1000'
                                }}
                                min={1}
                                max={1000}
                                defaultValue={[ 1,1000 ]}
                                tipFormatter={value => `$${value}`}
                                tipProps={{
                                    placement: "top",
                                    visible: true
                                }}
                                value={price}
                                onChange={price => setPrice(price)}
                            />
                        </div>
                        <div className={styles.productsPanelWrapper}>
                            {
                                products && products.map(product => {
                                    return <Product key={product._id} product={product} />
                                })
                            }
                        </div>
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

export default SearchResult
