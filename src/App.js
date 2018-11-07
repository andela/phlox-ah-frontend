import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import MsgInfo from './containers/MsgInfo/MsgInfo';
import Home from './containers/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';

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
        <MsgInfo />
        <ForgotPassword />
        <Home />
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/forgot/password" component={ForgotPassword} />
            <Route path="/reset_password/:token" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
