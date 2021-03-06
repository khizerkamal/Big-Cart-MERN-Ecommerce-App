import React,{ useState,useEffect,Fragment,forwardRef } from 'react'
import styles from './AllProducts.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MaterialTable from 'material-table'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';

import Loader from '../../../Layout/Loader/ModalLoader'
import MetaData from '../../../Layout/MetaData'
import { adminProducts,clearErrors,deleteProduct } from '../../../../store/actions/productsAction'
import { DELETE_PRODUCT_RESET } from '../../../../store/constants/productConstants'

//MUI TABLE ICONS
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props,ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props,ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props,ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props,ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props,ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props,ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props,ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props,ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props,ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props,ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props,ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props,ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props,ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props,ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props,ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props,ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props,ref) => <ViewColumn {...props} ref={ref} />)
};

const AllProducts = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
    const { loading,error,products } = useSelector(state => state.products)
    const { error: deleteError,isDeleted } = useSelector(state => state.deleteUpdateProduct)

    useEffect(() => {
        dispatch(adminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success("Deleted Successfully")
            history.push('/admin/products')
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
    },[ dispatch,alert,error,deleteError,isDeleted,history ])

    const columns = [
        {
            title: "ID",
            field: "id",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Name",
            field: "name",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Stock",
            field: "stock",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Price",
            field: "price",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Action",
            field: "action",
            cellStyle: {
                textAlign: "center"
            }
        }
    ];
    const setData = () => {
        var rows = [];
        products && products.forEach(product => {
            rows.push({
                id: product._id,
                name: product.name,
                stock: product.stock,
                price: `$${product.price}`,
                action: (
                    <div className={styles.btnsWrapper}>
                        <Link to={`/admin/products/update/${product._id}`} >
                            <button
                                className={styles.editBtn}
                            >
                                <FiEdit />
                            </button>
                        </Link>
                        <button
                            onClick={() => deleteProductHandler(product._id)}
                            className={styles.deleteBtn}
                        >
                            <RiDeleteBin5Line />
                        </button>
                    </div>
                )
            })
        })
        return rows;
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }

    return (
        <Fragment>
            <MetaData title={"All Products"} />
            {loading ? (
                <div className={styles.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <MaterialTable
                        columns={columns}
                        data={setData()}
                        title="All Products"
                        icons={tableIcons}
                        options={{
                            search: true,
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF',
                                textAlign: "center",
                                whiteSpace: "nowrap",
                                zIndex: "1"
                            }
                        }}
                    />
                </div>
            )}
            {/* {showModal && <OrderDetails onClose={() => setShowModal(false)} orderId={orderId} />} */}
        </Fragment>
    )
}

export default AllProducts
