import React,{ useEffect,useState } from 'react'
import axios from 'axios'
import { Switch,Route,useLocation } from 'react-router-dom'
// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { Body } from './components/Layout/Body/Body';
import Cart from './components/Layout/Cart/Cart';
import ProductDetails from './components/Layout/ProductDetails/ProductDetails';
import SearchResult from './components/Layout/SearchResult/SearchResult';
import Login from './components/Layout/User/Login/Login';
import Profile from './components/Layout/User/Profile/Profile';
import ResetPassword from './components/Layout/User/ResetPassword/ResetPassword';
import Shipping from './components/CheckoutSteps/Shipping/Shipping';
import ConfirmOrder from './components/CheckoutSteps/ConfirmOrder/ConfirmOrder';
import ProtectedRoute from './Route/ProtectedRoute';
import Payment from './components/CheckoutSteps/Payment/Payment';
import SuccessPage from './components/CheckoutSteps/SuccessPage/SuccessPage'
import OrderList from './components/Layout/Order/OrderList/OrderList'
import Header from './components/Layout/Header/Header'
import AdminRoutes from './AdminRoutes'
import Dashboard from './components/AdminPanel/Dashboard/Dashboard'

const ToggleSwitch = () => {
  const [ stripeApiKey,setStripeApiKey ] = useState('');

  useEffect(() => {
    async function getStripeApiKey() {
      const { data } = await axios.get('/api/v1/payment/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])

    let location = useLocation();   
    let background = location.state && location.state.background;
    return (
      <div>
        { !location.pathname.includes("/admin") ? <Header /> : ""}
        <Switch location={background || location}>
          <Route path="/" children={<Body />} exact/>
          <Route path="/cart" children={<Cart />} exact/>
          <Route path="/product/:id" children={<ProductDetails />} exact/>
          <Route path="/search/:keyword" children={<SearchResult/>} exact/>
          <Route path="/product/:id" children={<ProductDetails/>} />
          <Route path="/resetPassword/:token" children={<ResetPassword />} />
          <Route path="/login" children={<Login />} />
          <ProtectedRoute path="/user/me" component={Profile} exact/>
          <ProtectedRoute path="/shipping" component={Shipping} exact />
          <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact />
          <ProtectedRoute path="/success" component={SuccessPage} exact />
          <ProtectedRoute path="/orders/me" component={OrderList} exact />

          {/* ---------- ADMIN ROUTES ----------- */}
          <AdminRoutes />
          
          {/* ----------- STRIPE PAYMENT ROUTE ---------- */}
          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/order/payment" component={Payment} exact/>
            </Elements>
          )}
        </Switch>

      {/* Show the modal when a background page is set */}
      {background && <Route path="/login" children={<Login />} />}
    </div>
    )
}

export default ToggleSwitch
