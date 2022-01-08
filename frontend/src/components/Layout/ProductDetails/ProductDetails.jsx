import React,{ useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'

import { getProductDetail,clearErrors } from '../../../store/actions/productsAction'
import { addItemToCart } from '../../../store/actions/cartActions'
import Loader from '../Loader/Loader'
import Carousel from 'react-material-ui-carousel'
import MetaData from '../MetaData'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router';

const ProductDetails = () => {
    const [ quantity,setQuantity ] = useState(1)
    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { loading,error,product } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(getProductDetail(id))
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    },[ dispatch,alert,error,id ])

    const addToCart = () => {
        dispatch(addItemToCart(id,quantity))
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        alert.success("Added Successfully")
    }

    const increaseQty = () => {
        const count = document.getElementById('count').innerText;
        if ((count * 1) >= product.stock) return;
        const qty = (count * 1) + 1;
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.getElementById('count').innerText;
        if ((count * 1) <= 1) return;
        const qty = (count * 1) - 1;
        setQuantity(qty);
    }

    return (
        <>
            {loading ? <div className={styles.loader}><Loader /></div> : (
                <>
                    <MetaData title={product.name} />
                    <div className={styles.container}>
                        <div className={styles.left}>
                            {/* <Carousel
                                autoPlay={true}
                                animation="slide"
                                indicators={true}
                                navButtonsAlwaysVisible={true}
                                cycleNavigation={true}
                                className={styles.container}
                                StylesProvider
                                navButtonsProps={{
                                    style: {
                                        color: '#494949',
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: 0,
                                        margin: 0,
                                        width: 50,
                                    }
                                }}
                            >
                                {product.images && product.images.map(image => (
                                    <img className={styles.image} key={image.public_id} src={image.url} alt={product.title} />
                                ))}
                            </Carousel> */}
                            {product.images && product.images.map(image => (
                                <img className={styles.image} key={image.public_id} src={image.url} alt={product.title} />
                            ))}
                        </div>
                        <div className={styles.right}>
                            <h2 className={styles.name}>{product.name}</h2>
                            <span className={styles.productId}>Product # {product._id}</span>
                            <div className={styles.ratingsWrapper}>
                                <div className={styles.ratings}>
                                    <div className={styles.ratingouter}>
                                        <div className={styles.ratinginner} style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                                    </div>
                                </div>
                                <span className={styles.reviews}>({product.numOfReviews} Reviews)</span>
                                <div className={styles.logoWrapper}>
                                    <img src="/images/logo.svg" alt="logo" />
                                    <span className={styles.logoBig}>Assured</span>
                                </div>
                            </div>
                            <h1 className={styles.price}>$ {product.price}</h1>
                            <div className={styles.addToCartWrapper}>

                                <button className={styles.subtractButton} onClick={decreaseQty}>-</button>
                                {/* <input value={quantity} type="number" readOnly className={styles.quantity} id="count" /> */}
                                <span className={styles.quantity} id="count">{quantity}</span>
                                <button className={styles.addButton} onClick={increaseQty}>+</button>

                                <button
                                    className={styles.AddProdButton}
                                    disabled={product.stock === 0}
                                    onClick={addToCart}
                                >
                                    <img src="/images/shopping-cart.svg" alt="cart" />
                                    Add to Cart
                                </button>
                            </div>
                            <div className={styles.statusWrapper}>
                                <h3>Status:
                                    <span className={`${styles.status} ${product.stock > 0 ? styles.green : styles.red}`}>
                                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </h3>
                            </div>
                            <div className={styles.descriptionWrapper}>
                                <span className={styles.descriptionHeading}>Description:</span>
                                <h3 className={styles.description}>{product.description}</h3>
                            </div>
                            <p className={styles.seller}>Sold By: <strong>{product.seller}</strong></p>
                            <button className={styles.reviewBtn}>
                                Submit Your Review
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails
