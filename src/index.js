import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import registerServiceWorker from './registerServiceWorker';

//Alert messagem options
const options = {
    position: 'top right',
    timeout: 3000,
    offset: '30px',
    transition: 'scale'
}

ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
        <App />
    </AlertProvider>,
    document.getElementById('root'));
registerServiceWorker();
