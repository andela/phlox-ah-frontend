import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import './styles/style.scss';

import App from './App';
import RootReducer from './reducers/Index';

const store = createStore(RootReducer, applyMiddleware(createLogger(), thunk));
const Index = () => (
    <Provider store={ store }>
      <div>
        <App />
      </div>
    </Provider>
);
render(<Index/>, document.getElementById('root'));
