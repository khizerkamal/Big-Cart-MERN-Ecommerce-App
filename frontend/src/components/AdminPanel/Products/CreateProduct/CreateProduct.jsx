import React,{ useState,useEffect } from 'react'

import styles from './CreateProduct.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MetaData from '../../../Layout/MetaData'
import { createProduct,clearErrors } from '../../../../store/actions/productsAction'
import {CREATE_PRODUCT_RESET} from '../../../../store/constants/productConstants'

const CreateProduct = () => {
    const [ name,setName ] = useState('');
    const [ price,setPrice ] = useState(0);
    const [ description,setDescription ] = useState('');
    const [ stock,setStock ] = useState(0);
    const [ category,setCategory ] = useState('');
    const [ brand,setBrand ] = useState('');
    const [ images,setImages ] = useState([]);
    const [ imagesPreview,setImagesPreview ] = useState([]);

    const { error,loading,product,success } = useSelector(state => state.newProduct)
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            history.push('/admin/products');
            alert.success('Product created successfully');
            dispatch({ type: CREATE_PRODUCT_RESET })
        }
    },[ alert,dispatch,error,success,history ])

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();     
        formData.set('name',name);
        formData.set('price',price);
        formData.set('description',description);
        formData.set('stock',stock);
        formData.set('category',category);
        formData.set('brand',brand);

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
        <div>
            
        </div>
    )
}

export default CreateProduct
