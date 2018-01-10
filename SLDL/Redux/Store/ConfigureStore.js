/**
 * Created by guohongan on 2017/12/22.
 */
import {createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from '../Reducer/LoginReducer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState){
    return createStoreWithMiddleware( RootReducer, initialState);
}