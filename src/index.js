import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import jwtDecode from 'jwt-decode';
import setAuthToken from './util/AuthTokenUtil';
import { asyncActions } from './util/AsyncUtil';
import { USER } from './actionTypes/UserConstants';
import './styles/style.scss';

import App from './App';
import rootReducer from './reducers/Index';

const store = createStore(rootReducer, applyMiddleware(createLogger(), thunk));


if (localStorage.token) {
  // setting token to request headers for authentication
  setAuthToken(localStorage.token);
  // adding user object to User's store
  store.dispatch(asyncActions(USER).success(jwtDecode(localStorage.token)));
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
