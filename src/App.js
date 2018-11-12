import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
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
  render() {
    return (
      <div>
        <Header />
        <h1
          className="theme-color center">
          Hello! Welcome to Authors Haven
        </h1>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/password/reset/:token" component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
