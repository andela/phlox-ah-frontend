import React from 'react';
import {
  Link, Route
} from 'react-router-dom';

import LoginForm from './components/Login';
import Home from './components/Home';

const App = () => (
  <div>
    <div>
      <Link to='/'>Home</Link> | <Link to='/login'>Login</Link>
    </div>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={LoginForm} />
    </div>
  </div>
);

export default App;
