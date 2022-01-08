import React,{ useState,useEffect,Fragment,forwardRef } from 'react'
import styles from './AllProducts.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MaterialTable from 'material-table'

import Loader from '../../../Layout/Loader/ModalLoader'
import MetaData from '../../../Layout/MetaData'
import { adminProducts,clearErrors } from '../../../../store/actions/productsAction'
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
    const { loading,error,products } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(adminProducts());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[ dispatch,alert,error ])

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
                action: <button
                    onClick={() => {
                       
                    }}
                    className={styles.detailsBtn}
                >
                    Details
                </button>
            })
        })
        return rows;
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
