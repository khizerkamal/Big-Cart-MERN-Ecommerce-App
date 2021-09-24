import React,{ useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Pagination } from '@mui/material';

import { searchedProducts } from '../../../store/actions/productsAction'
import Loader from '../Loader/Loader'
import styles from './SearchResult.module.css'
import Product from '../Body/Product/Product';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const SearchResult = ({ match }) => {
    const [ currentPage,setCurrentPage ] = useState(1)
    const [ price,setPrice ] = useState([ 1,1000 ])
    const [ category,setCategory ] = useState('')
    const [ ratings,setRatings ] = useState(0)

    const categories = [ "Electronics","Cameras","Laptops","Accessories","Books","Food","Headphones",
        "Clothes/Shoes","Beauty/Health","Sports","Outdoor","Home" ]
    const keyword = match.params.keyword;

    const { loading,products,totalProducts,error,filteredProductsCount } = useSelector(state => state.searchedProducts)
    const resPerPage = 20;
    const count = filteredProductsCount;
    const pages = Math.ceil(totalProducts / resPerPage);
    const handleChange = (event,value) => {
        setCurrentPage(value);
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    let flag = true;
    // Getting All Products from DB and Set in Redux
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        if (!flag) {
            return setTimeout(() => {
                dispatch(searchedProducts(currentPage,resPerPage,keyword,price,category,ratings));
            },1000);
        }
        dispatch(searchedProducts(currentPage,resPerPage,keyword,price,category,ratings));
    },[ dispatch,alert,error,currentPage,keyword,resPerPage,price,flag,category,ratings ])
    return (
        <div className={styles.body}>
            <div className={styles.headingWrapper}>
                <h1 className={styles.heading}>Your Searched {keyword} </h1>
            </div>
            <div className={styles.container}>
                <div className={styles.searchPanelWrapper}>
                    <h3 className={styles.priceHeading}>Price</h3>
                    <div className={styles.priceFilterWrapper}>
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
                            onChange={price => {
                                setPrice(price)
                                flag = false
                            }
                            }
                        />
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.categoryFilterWrapper}>
                        <h3 className={styles.categoryHeading}>Category</h3>
                        {
                            categories.map(category => (
                                <button
                                    className={styles.categoryButton}
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </button>
                            ))
                        }
                    </div>
                    <div className={styles.line}></div>
                    <div className={styles.starFilterWrapper}>
                        <h3 className={styles.categoryHeading}>Rating</h3>
                        {
                            <ul>
                                {
                                    [ 5,4,3,2,1 ].map(star => (
                                        <li
                                            className={styles.star}
                                            key={star}
                                            onClick={() => setRatings(star)}
                                        >
                                            <div className={`${styles.starsWrapper} ${styles.ratings}`}>
                                                <div className={styles.ratingouter}>
                                                    <div
                                                        className={styles.ratinginner}
                                                        style={{ width: `${star * 20}%` }}></div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        }
                    </div>
                </div>
                {loading ? <div className={styles.loaderWrapper}><Loader /></div> : (
                    <div className={styles.productsPanelWrapper}>
                        {
                            products && products.map(product => {
                                return <Product margin={true} key={product._id} product={product} />
                            })
                        }
                    </div>
                )}
            </div>
            <div className={styles.paginationWrapper}>
                {resPerPage <= count && (<Pagination
                    count={pages}
                    page={currentPage}
                    onChange={handleChange}
                    showFirstButton={true}
                    showLastButton={true}
                />
                )}
            </div>
        </div>
    )
}

export default SearchResult
