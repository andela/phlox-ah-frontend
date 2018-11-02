import React, { Component } from 'react';
// eslint-disable-next-line
// import { render } from 'react-dom';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';

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
      </div>
    );
  }
}

export default App;
