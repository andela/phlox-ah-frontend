import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';
import ViewArticle from './containers/ViewAnArticle/ViewArticle';
import VerifyUser from './containers/VerifyUser/VerifyUser';

import './App.scss';


/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
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
        <ResetPassword />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/password/forgot-success" component={SentResetPasswordMail} />
            <Route path="/password/reset/:token" component={Home} />
            <Route path="/articles/:articleslug" exact component={ViewArticle} />
            <Route path="/articles" component={CreateArticle} />
            <Route path="/user/verify/:verificationToken" component={VerifyUser} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
