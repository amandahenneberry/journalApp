import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)
