import React,{ useState,useEffect,Fragment,forwardRef } from 'react'
import styles from '../../Products/AllProducts/AllProducts.module.css'
import { useDispatch,useSelector } from 'react-redux'
import { Link,useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import MaterialTable from 'material-table'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import {BiMessageSquareDetail} from 'react-icons/bi';

import Loader from '../../../Layout/Loader/ModalLoader'
import MetaData from '../../../Layout/MetaData'
import { allOrders,clearErrors } from '../../../../store/actions/orderActions'
// import { DELETE_PRODUCT_RESET } from '../../../../store/constants/productConstants'

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
import OrderDetails from './../../../Layout/Order/OrderDetails/OrderDetails';

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

const OrderList = () => {
    const [detailModal, setDetailModal] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [orderId, setOrderId] = useState()
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading,error,orders } = useSelector(state => state.allOrder)

    useEffect(() => {
        dispatch(allOrders());
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        // if (deleteError) {
        //     alert.error(deleteError);
        //     dispatch(clearErrors());
        // }
        // if (isDeleted) {
        //     alert.success("Deleted Successfully")
        //     history.push('/admin/products')
        //     dispatch({ type: DELETE_PRODUCT_RESET })
        // }
    },[ dispatch,alert,error ])

    const columns = [
        {
            title: "OrderId",
            field: "orderid",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "No. of Items",
            field: "numOfItems",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Amount",
            field: "amount",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Status",
            field: "status",
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
        orders && orders.forEach(order => {
            rows.push({
                orderid: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                action: (
                    <div className={styles.btnsWrapper}>
                        {/* <Link to={`/admin/products/update/${order._id}`} > */}
                            <button
                                onClick={() => {
                                    setUpdateModal(true)
                                    setOrderId(order._id)
                                }}
                                className={styles.editBtn}
                            >
                                <FiEdit />
                            </button>
                        {/* </Link> */}
                        <button
                            // onClick={() => deleteProductHandler(product._id)}
                            className={styles.deleteBtn}
                        >
                            <RiDeleteBin5Line />
                        </button>
                        <button
                            onClick={() => {
                                setDetailModal(true)
                                setOrderId(order._id)
                            }}
                            className={styles.detailsBtn}
                        >
                            <BiMessageSquareDetail />
                        </button>
                    </div>
                )
            })
        })
        return rows;
    }

    return  (
    <Fragment>
    <MetaData title={"ALL Orders"} />
    {loading ? (
        <div className={styles.loader}>
            <Loader />
        </div>
    ) : (
        <div className={styles.tableContainer}>
            <MaterialTable
                columns={columns}
                data={setData()}
                title="All Orders"
                icons={tableIcons}
                options={{
                    search: true,
                    headerStyle: {
                        backgroundColor: '#000',
                        color: '#FFF',
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        zIndex: "1"
                    }
                }}
            />
        </div>
    )}
    {detailModal && <OrderDetails onClose={() => setDetailModal(false)} orderId={orderId} />}
    {updateModal && <OrderDetails onClose={() => setUpdateModal(false)} orderId={orderId} />}
</Fragment>
)};

export default OrderList;
