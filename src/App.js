import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';
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
        <ForgotPassword />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/home" exact component={Home} />
            <Route path="/forgot/password" component={ForgotPassword} />
            <Route path="/reset_password_mail_sent/success" component={SentResetPasswordMail} />
            <Route path="/reset_password/:token" component={ResetPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
