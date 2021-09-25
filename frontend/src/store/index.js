import { createStore,combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, searchProductReducer } from './reducers/productReducers';
import { authReducer, userReducer, forgotPasswordReducer } from './reducers/userReducers'

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    searchedProducts: searchProductReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
})

let initalState = {}

const middleware = [ thunk ];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;