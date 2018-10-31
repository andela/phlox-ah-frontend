import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/app';

const Index = () => (
    <Provider store={ store }>
      <div>
        <App />
      </div>
    </Provider>
);
render(<Index/>, document.getElementById('root'));
