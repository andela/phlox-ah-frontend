import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import MsgInfo from './containers/MsgInfo/MsgInfo';
import Home from './containers/Home/Home';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import Signup from './containers/Signup/Signup';
import ViewArticle from './containers/Articles/ViewAnArticle/ViewArticle';

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
        <h1 className="theme-color center">Hello! Welcome to Authors Haven</h1>
        <Signup />
        <Login />
        <MsgInfo />
        <ForgotPassword />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/forgot/password" component={ForgotPassword} />
            <Route path="/reset_password/:token" component={ResetPassword} />
            <Route path="/articles/:articleslug" exact component={ViewArticle} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
