import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import {AppContainer} from "./App";
import {Provider} from "react-redux";
import store from "./redux/redux-store";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>,
    document.getElementById('root')
)

