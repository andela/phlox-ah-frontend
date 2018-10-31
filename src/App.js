import React from 'react';
import { Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Pages/LoginPage';
import Home from './components/Pages/HomePage';

const App = () => (
  <div>
    <Navbar />
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={LoginForm} />
    </div>
  </div>
);

export default App;
