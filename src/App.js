import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import MsgInfo from './containers/MsgInfo/MsgInfo';
import Home from './containers/Home/Home';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import SentResetMail from './containers/Password/SentResetMail';
import Signup from './containers/Signup/Signup';

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
        <Signup />
        <Login />
        <MsgInfo />
        <ForgotPassword />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/forgot/password" component={ForgotPassword} />
            <Route path="/reset_password_mail_sent/success" component={SentResetMail} />
            <Route path="/reset_password/:token" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
