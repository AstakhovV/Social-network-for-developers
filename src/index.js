import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import './index.css';
import MainApp from "./App";

ReactDOM.render(
    <MainApp />, // провайдер для прокидывания пропсов в компоненты
    document.getElementById('root')
)

