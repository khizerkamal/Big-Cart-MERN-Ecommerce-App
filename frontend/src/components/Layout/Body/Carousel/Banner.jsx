import React from 'react'

import styles from './Banner.module.css'
import Carousel from 'react-material-ui-carousel'
import { bannerData } from '../../../../constants/data';

const Banner = () => {
    return (
        <Carousel
            autoPlay={true}
            animation="slide"
            indicators={false}
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
            {
                bannerData.map(image => (
                    <img src={image} className={styles.image} alt="banner" />
                ))
            }
        </Carousel>
    )
}

export default Banner
