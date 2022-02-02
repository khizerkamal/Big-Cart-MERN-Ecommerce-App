import React, {useState, useEffect} from 'react';
import styles from './OrderStatus.module.css'
import ModalLoader from './../../../Layout/Loader/ModalLoader';
import { useSelector, useDispatch } from 'react-redux';
import { orderDetails, updateOrderStatus, clearErrors } from './../../../../store/actions/orderActions';
import { ORDER_STATUS_RESET} from './../../../../store/constants/orderConstants';
import { useAlert } from 'react-alert';
import { useHistory } from 'react-router-dom';

const OrderStatus = ({onClose, orderId}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const history = useHistory();

    const {loading, order={} } = useSelector((state) => state.orderDetail)
    const {loading:statusLoading, isUpdated, error } = useSelector((state) => state.order)
    
    const [status, setStatus] = useState('Processing');

    const {paymentInfo} = order;

    useEffect(() => {
     dispatch(orderDetails(orderId))

     if(error){
         alert.error(error);
         dispatch(clearErrors())
     }

     if (isUpdated) {
        onClose();
        alert.success('Order updated successfully');
        dispatch({ type: ORDER_STATUS_RESET })
    }
    
    }, [dispatch, orderId, alert, error, clearErrors, isUpdated]);

    const submitHandler = () => {
        const formData = new FormData();
        formData.set('status', status)
        dispatch(updateOrderStatus(orderId, formData));
    }

    const data = ['Processing', 'Packing', 'Delivered']

  return (
    <div className={styles.modalMask}>
            <div className={`${styles.modalWrapper}`}>
                <div onClick={onClose} className={styles.closeButton}>
                    <img src="/images/cancel.png" alt="close" />
                </div>
                {loading ? <div className={styles.loaderWrapper}><ModalLoader /></div> : (
                    <div className={styles.absolute}>
                        <div className={styles.topBar}>
                            <h2>STRIPE ID: {paymentInfo && paymentInfo.id}</h2>
                        </div>
                        <div className={styles.container}>
                            <div className={styles.boxWrapper}>
                                <div className={styles.selectWrapper}>
                                    <select className={styles.classic} onChange={(e) => setStatus(e.target.value)}>
                                        {data.map((option, id) => (
                                            <option key={id} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.updateBtnWrapper}>
                                    <button onClick={submitHandler}>
                                        {statusLoading ? 'Loading ...' : 'UPDATE'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
  )};

export default OrderStatus;
