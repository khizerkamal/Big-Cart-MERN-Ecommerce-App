import { createStore,combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, searchProductReducer, newReviewReducer,createProductReducer, deleteProductReducer } from './reducers/productReducers';
import { authReducer,userReducer,forgotPasswordReducer } from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers';
import { newOrderReducer, myOrdersReducer, orderDetailsReducer } from './reducers/orderReducers';

const reducer = combineReducers({
    products: productReducer,
    newProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    productDetails: productDetailsReducer,
    searchedProducts: searchProductReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: orderDetailsReducer,
    newReview: newReviewReducer,
})

let initalState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ?
            JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ?
            JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
}

const middleware = [ thunk ];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;