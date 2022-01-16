import React,{ useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import Rating from '@mui/material/Rating';

import styles from './ReviewModal.module.css'
import { newReview, clearErrors } from '../../../../store/actions/productsAction'
import MetaData from '../../MetaData'
import {NEW_REVIEW_RESET} from '../../../../store/constants/productConstants'

const ReviewModal = () => {
    const [ value,setValue ] = useState(0);
    const [ comment,setComment ] = useState('')
    const [ reviewModal,setReviewModal ] = useState(false)

    const { user } = useSelector(state => state.auth)
    const { error,success } = useSelector(state => state.newReview)
    
    const dispatch = useDispatch();
    const alert = useAlert();
    let { id } = useParams();

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error);
    //         dispatch(clearErrors())
    //     }
    //     if (success) {
    //         alert.success('Reivew posted successfully')
    //         dispatch({ type: NEW_REVIEW_RESET })
    //     }
    // }, [dispatch, alert, error, success])

    const reviewHandler = () => {
        setReviewModal(!reviewModal)
        const formData = new FormData();
        formData.set('rating',value);
        formData.set('comment',comment);
        formData.set('productId', id);
        dispatch(newReview(formData));
    }

    return (
        <>
            {user ?
                <button
                    className={styles.reviewBtn}
                    onClick={() => setReviewModal(!reviewModal)}
                >
                    Submit Your Review
                </button> : <p className={styles.warning} >Login First to Review</p>
            }
            {reviewModal && (
                <div className={styles.modalMask}>
                    <MetaData title="Submit Review" />
                    <div className={`${styles.modalWrapper} ${styles.h70}`}>
                        <div onClick={() => setReviewModal(!reviewModal)} className={styles.closeButton}>
                            <img src="/images/close.png" alt="close" />
                        </div>
                        <div className={styles.contentWrapper}>
                            <div className={styles.reviewHeaderWrapper}>
                                <div className={styles.imgWrapper}>
                                    <img src="/images/rating.png" alt="rating" />
                                </div>
                                <h2 className={styles.heading}>SUBMIT REVIEW</h2>
                            </div>
                            <div className={styles.modalBody}>
                                <div className={styles.ratingWrapper}>
                                    <Rating
                                        name="half-rating"
                                        precision={0.5}
                                        sx={{
                                            fontSize: 50
                                        }}
                                        value={value}
                                        size="large"
                                        onChange={(event,newValue) => {
                                            setValue(newValue);
                                        }}
                                    />
                                </div>
                                <textarea
                                    className={styles.comment}
                                    placeholder="Enter Comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                >
                                </textarea>
                                <button className={styles.submitBtn} onClick={reviewHandler}>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ReviewModal
