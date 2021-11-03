import React from 'react'
import {Switch, Route, useLocation} from 'react-router-dom'
import { Body } from './components/Layout/Body/Body';
import Cart from './components/Layout/Cart/Cart';
import ProductDetails from './components/Layout/ProductDetails/ProductDetails';
import SearchResult from './components/Layout/SearchResult/SearchResult';
import Login from './components/Layout/User/Login/Login';
import Profile from './components/Layout/User/Profile/Profile';
import ResetPassword from './components/Layout/User/ResetPassword/ResetPassword';
import ProtectedRoute from './Route/ProtectedRoute';

const ToggleSwitch = () => {
    let location = useLocation();   
    let background = location.state && location.state.background;
    return (
        <div>
      <Switch location={background || location}>
        <Route exact path="/" children={<Body />} />
        <Route path="/cart" children={<Cart />} />
        <Route path="/product/:id" children={<ProductDetails />} />
        <Route path="/search/:keyword" children={<SearchResult/>} />
        <Route path="/product/:id" children={<ProductDetails />} />
        <Route path="/resetPassword/:token" children={<ResetPassword />} />
        <ProtectedRoute path="/user/me" children={<Profile />} />
        <Route path="/login" children={<Login />} />
      </Switch>

      {/* Show the modal when a background page is set */}
      {background && <Route path="/login" children={<Login />} />}
    </div>
    )
}

export default ToggleSwitch
