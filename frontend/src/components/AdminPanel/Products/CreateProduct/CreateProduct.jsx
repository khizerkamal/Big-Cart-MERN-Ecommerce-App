import React,{ useState,useEffect,Fragment } from 'react'

import styles from './CreateProduct.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MetaData from '../../../Layout/MetaData'
import { createProduct,clearErrors } from '../../../../store/actions/productsAction'
import { CREATE_PRODUCT_RESET } from '../../../../store/constants/productConstants'

const CreateProduct = () => {
    const [ name,setName ] = useState('');
    const [ price,setPrice ] = useState();
    const [ description,setDescription ] = useState('');
    const [ stock,setStock ] = useState();
    const [ category,setCategory ] = useState('');
    const [ brand,setBrand ] = useState('');
    const [ images,setImages ] = useState([]);
    const [ imagesPreview,setImagesPreview ] = useState([]);

    const { error,loading,product,success } = useSelector(state => state.newProduct)
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const categories = [ "Electronics","Cameras","Laptops","Accessories","Books","Food",
        "Headphones","Clothes/Shoes","Beauty/Health","Sports","Outdoor","Home" ]

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            history.push('/admin/products/all');
            alert.success('Product created successfully');
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    },[ alert,dispatch,error,success,history ])

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

        dispatch(createProduct(formData))
    }

    const onChange = e => {
        const files = Array.from(e.target.files)
        setImagesPreview([]);
        setImages([])
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
            <MetaData title={"Create New Product"} />
            <div className={styles.headerWrapper}>
                <div className={styles.imgWrapper}>
                    <img src="/images/stock.png" alt="stock" />
                </div>
                <h1>CREATE NEW PRODUCT</h1>
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
                        CREATE
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProduct
