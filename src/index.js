import React from 'react';
import './index.css';
import store from "./redux/redux-store";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
        <App //state={store.getState()} dispatch={store.dispatch.bind(store)} store={store}
        />
    </Provider>
    </BrowserRouter>, // провайдер для прокидывания пропсов в компоненты
    document.getElementById('root')
)

