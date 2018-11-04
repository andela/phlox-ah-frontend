import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import LoginForm from './components/Pages/LoginPage';
import HomePage from './components/Pages/HomePage';

import './App.scss';
/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   *
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof App
   */
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <Header />
        <h1 className="theme-color">Hello! Welcome to Authors Haven</h1>
        This is the app component
        <Login />
        <Home />
        <div>
          <Navbar />
          <div>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginForm} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
