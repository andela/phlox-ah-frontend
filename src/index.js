import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import jwtDecode from 'jwt-decode';
import queryString from 'query-string';
import setAuthToken from './util/AuthTokenUtil';
import { asyncActions } from './util/AsyncUtil';
import { msgInfoActions } from './actions/MsgInfoActions';
import { LOGIN } from './actionTypes/UserConstants';
import 'materialize-css/dist/css/materialize.min.css';
import './styles/style.scss';

import App from './App';
import rootReducer from './reducers/Index';


const parsedToken = queryString.parse(window.location.search);

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunk));

if (localStorage.getItem('token') === null) {
  if (parsedToken.token) {
    localStorage.setItem('token', parsedToken.token);
    setTimeout(() => {
      window.location.href = window.location.origin + window.location.pathname;
    }, 2000);
    store.dispatch(msgInfoActions.success(['succesfully logged in!']));
  }
}

if (localStorage.token) {
  // setting token to request headers for authentication
  setAuthToken(localStorage.token);
  // adding user object to User's store
  store.dispatch(asyncActions(LOGIN).success(jwtDecode(localStorage.token)));
}

const Index = () => (
  <BrowserRouter>
    <Provider store={ store }>
      <div>
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);

render(<Index/>, document.getElementById('root'));
