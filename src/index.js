import React from 'react';
import './index.css';
import store from "./redux/state";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

let rerenderEntireTree = () => {
    ReactDOM.render(<App state={store.getState()}
                         dispatch={store.dispatch.bind(store)}
                         store={store}
        />,
        document.getElementById('root'));
}

rerenderEntireTree(store.getState());// функция обновления дерева

store.subscribe(rerenderEntireTree);