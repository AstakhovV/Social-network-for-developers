import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import { AppContainer } from "./App";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter basename='/Social-network-for-developers'>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
)

