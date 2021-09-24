import React,{ useState } from 'react';
import MetaData from '../MetaData';
import { useDispatch,useSelector } from 'react-redux';
import { useAlert } from 'react-alert'

import Banner from './Carousel/Banner'
import Navbar from './Navbar/Navbar'
import { getProducts } from '../../../store/actions/productsAction';
import JustForYou from './ProductSections/JustForYou/JustForYou';


export const Body = ({ match }) => {
    const container = {
        padding: '10px',
        backgroundColor: '#f2f2f2'
    }
    const { loading,products,totalProducts,error } = useSelector(state => state.products)
   
    return (
        <>
            <MetaData title="Online Shopping Site" />
            <Navbar />
            <div style={container}>
                <Banner />
            </div>
            <div style={container}>
                <JustForYou match={match} />
            </div>
        </>
    )
}
