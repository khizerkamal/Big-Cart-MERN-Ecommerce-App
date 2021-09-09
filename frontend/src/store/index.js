import { createStore,combineReducers,applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productReducer
})

let initalState = {}

const middleware = [ thunk ];
const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;