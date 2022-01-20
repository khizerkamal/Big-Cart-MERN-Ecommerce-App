import React,{ useState,useEffect,Fragment } from 'react'

import styles from '../CreateProduct/CreateProduct.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { useParams } from 'react-router'
import { useAlert } from 'react-alert'
import MetaData from '../../../Layout/MetaData'
import { updateProduct,clearErrors,getProductDetail } from '../../../../store/actions/productsAction'
import { UPDATE_PRODUCT_RESET } from '../../../../store/constants/productConstants'

const UpdateProduct = ({ match }) => {
    const [ name,setName ] = useState('');
    const [ price,setPrice ] = useState();
    const [ description,setDescription ] = useState('');
    const [ stock,setStock ] = useState();
    const [ category,setCategory ] = useState('');
    const [ brand,setBrand ] = useState('');
    const [ images,setImages ] = useState([]);

    const [ oldImages,setOldImages ] = useState([]);
    const [ imagesPreview,setImagesPreview ] = useState([]);

    const { error: updateError,loading,isUpdated } = useSelector(state => state.deleteUpdateProduct)
    const { error,product } = useSelector(state => state.productDetails)
    const { id } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const categories = [ "Electronics","Cameras","Laptops","Accessories","Books","Food",
        "Headphones","Clothes/Shoes","Beauty/Health","Sports","Outdoor","Home" ]

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetail(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setBrand(product.seller);
            setStock(product.stock)
            setOldImages(product.images)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            history.push('/admin/products');
            alert.success('Product updated successfully');
            dispatch(getProductDetail(id)); //minor bug solved by me
            dispatch({ type: UPDATE_PRODUCT_RESET })
        }
    },[ alert,dispatch,error,history,isUpdated,product,id,updateError ])

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set('name',name);
        formData.set('price',price);
        formData.set('description',description);
        formData.set('stock',stock);
        formData.set('category',category);
        formData.set('seller',brand);

        images.forEach(img => {
            formData.append('images',img)
        })
        dispatch(updateProduct(product._id,formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
        setOldImages([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [ ...oldArray,reader.result ])
                    setImages(oldArray => [ ...oldArray,reader.result ])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    return (
        <div className={styles.pageWrapper}>
            <MetaData title={"Update Product"} />
            <div className={styles.headerWrapper}>
                <div className={styles.imgWrapper}>
                    <img src="/images/stock.png" alt="stock" />
                </div>
                <h1>UPDATE PRODUCT</h1>
            </div>
            <form onSubmit={submitHandler} className={styles.form} >
                <div className={styles.inputBox}>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className={styles.flex}>
                    <div className={styles.inputBox}>
                        <input
                            type="number"
                            placeholder="Enter Price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type="number"
                            placeholder="Enter stock"
                            value={stock}
                            onChange={e => setStock(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.inputBox}>
                    <textarea
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.flex}>
                    <div className={styles.selectWrapper}>
                        <select
                            className={styles.classic}
                            onChange={e => setCategory(e.target.value)}
                            value={category}
                        >
                            <option value="" disabled selected hidden>Select Category</option>
                            {categories.map(cat => (
                                <option value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            placeholder="Enter Brand"
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.borderedContainer}>
                    <h3 className={styles.imageHeading}>Select Product Images</h3>
                    <label className={styles.imagesLabel} htmlFor='customFile'>
                        <img src="/images/add.png" alt="add" className={styles.addImg} />
                    </label>
                </div>
                <input
                    type='file'
                    name='product_images'
                    className={styles.imagesInput}
                    id='customFile'
                    onChange={onChange}
                    multiple
                    accept="images/*"
                />
                <div className={styles.productImagesWrapper}>
                    {oldImages && oldImages.map(img => (
                        <div className={styles.productImageWrapper}>
                            <img src={img.url} key={img} alt="Images Preview" className="productImg" />
                        </div>
                    ))}
                </div>
                <div className={styles.productImagesWrapper}>
                    {imagesPreview.map(img => (
                        <div className={styles.productImageWrapper}>
                            <img src={img} key={img} alt="Images Preview" className="productImg" />
                        </div>
                    ))}
                </div>
                <div className={styles.btnWrapper}>
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={loading ? true : false}
                    >
                        UPDATE
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProduct
