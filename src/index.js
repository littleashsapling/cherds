import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';

window.app = App
const rootElement = document.getElementById('root');
ReactDOM.render( < App / > , rootElement);