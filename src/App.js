import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './containers/Header/Header';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';
import PrivateRoute from './PrivateRoute';

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
        <ForgotPassword />
        <Login />
        <ResetPassword />
        <Signup />
        <div>
          <Switch>
            <PrivateRoute path='/profile/edit' component={EditProfile} />
            <PrivateRoute path='/profile' component={ViewProfile} />
            <Route path="/" exact component={Home} />
            <Route path="/password/forgot-success" component={SentResetPasswordMail} />
            <Route path="/password/reset/:token" component={Home} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
