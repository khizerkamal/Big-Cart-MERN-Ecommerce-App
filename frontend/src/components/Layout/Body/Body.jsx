import React from 'react'
import MetaData from '../MetaData'

import Banner from './Carousel/Banner'
import Navbar from './Navbar/Navbar'

export const Body = () => {
    const container = {
        padding: '10px',
        backgroundColor: '#f2f2f2'
    }

    return (
        <>
            <MetaData title="Online Shopping Site" />
            <Navbar />
            <div style={container}>
                <Banner />
            </div>
        </>
    )
}
