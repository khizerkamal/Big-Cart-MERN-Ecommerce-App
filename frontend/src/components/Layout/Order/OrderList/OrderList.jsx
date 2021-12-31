import React,{ useState,useEffect,Fragment,forwardRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import MaterialTable from 'material-table'

import styles from './OrderList.module.css'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import { myOrders,clearErrors } from '../../../../store/actions/orderActions'
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
import OrderDetails from '../OrderDetails/OrderDetails'
import { Link } from 'react-router-dom'

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
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading,error,orders } = useSelector(state => state.myOrders)
    const { user } = useSelector(state => state.auth)
    const [ showModal,setShowModal ] = useState(false)
    const [ orderId,setOrderId ] = useState("")

    useEffect(() => {
        dispatch(myOrders(user._id));
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[ dispatch,alert,error,user._id ])

    const columns = [
        {
            title: "ID",
            field: "id",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Date",
            field: "date",
            cellStyle: {
                textAlign: "center"
            }
        },
        {
            title: "Num Of Items",
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
    function getDate(d) {
        var day,month,year;

        var result = d.match("[0-9]{2}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{4}");
        if (null != result) {
            var dateSplitted = result[ 0 ].split(result[ 1 ]);
            day = dateSplitted[ 0 ];
            month = dateSplitted[ 1 ];
            year = dateSplitted[ 2 ];
        }
        result = d.match("[0-9]{4}([\-/ \.])[0-9]{2}[\-/ \.][0-9]{2}");
        if (null != result) {
            dateSplitted = result[ 0 ].split(result[ 1 ]);
            day = dateSplitted[ 2 ];
            month = dateSplitted[ 1 ];
            year = dateSplitted[ 0 ];
        }

        if (month > 12) {
            var aux = day;
            day = month;
            month = aux;
        }

        return year + "/" + month + "/" + day;
    }
    const setData = () => {
        var rows = [];
        orders && orders.forEach(order => {
            rows.push({
                id: order._id,
                date: getDate(order.paidAt),
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: "green" }}>{order.orderStatus}</p>
                    : <p style={{ color: "red" }}>{order.orderStatus}</p>,
                action: <button
                    onClick={() => {
                        setShowModal(true)
                        setOrderId(order._id)
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
            <MetaData title={"My Orders"} />
            {loading ? (
                <div className={styles.loader}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.tableContainer}>
                    <MaterialTable
                        columns={columns}
                        data={setData()}
                        title="My Orders"
                        icons={tableIcons}
                        options={{
                            search: true,
                            headerStyle: {
                                backgroundColor: '#01579b',
                                color: '#FFF',
                                textAlign: "center",
                                whiteSpace: "nowrap",
                            }
                        }}
                    />
                </div>
            )}
            {showModal && <OrderDetails onClose={() => setShowModal(false)} orderId={orderId} />}
        </Fragment>
    )
}

export default OrderList
