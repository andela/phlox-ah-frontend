import React, { Component } from 'react';
// eslint-disable-next-line
import { render } from 'react-dom';
import Home from './containers/Home/Home';

/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} -
   */
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <h1 className="theme-color">Hello! Welcome to Authors Haven</h1>
        This is the app component
        <Home />
      </div>
    );
  }
}

export default App;
