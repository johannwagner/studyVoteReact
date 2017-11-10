import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import promise from "redux-promise-middleware"
import logger from "redux-logger"

import loginReducer from "./Reducers/loginReducer";
import fetchDataReducer from './Reducers/fetchDataReducer';
import stateReducer from "./Reducers/stateReducer";


let reducers = combineReducers({
    login: loginReducer,
    fetchedData: fetchDataReducer,
    state: stateReducer,
});

let reduxStore = createStore(reducers, applyMiddleware(logger, promise()));


ReactDOM.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
