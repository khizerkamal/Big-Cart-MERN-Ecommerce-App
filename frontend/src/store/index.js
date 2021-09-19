import { createStore,combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer, searchProductReducer } from './reducers/productReducers';

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    searchedProducts: searchProductReducer,
})

let initalState = {}

const middleware = [ thunk ];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;