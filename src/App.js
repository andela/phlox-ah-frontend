import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import PrivateRoute from './PrivateRoute';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';
import ViewArticle from './containers/ViewArticle/ViewArticle';
import VerifyUser from './containers/VerifyUser/VerifyUser';
import ViewTag from './containers/Tag/ViewTag';

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
            <PrivateRoute path='/profile/edit' component={EditProfile} />
            <PrivateRoute path='/profile' component={ViewProfile} />
            <Route path="/" exact component={Home} />
            <Route path="/password/forgot-success" component={SentResetPasswordMail} />
            <Route path="/password/reset/:token" component={Home} />
            <Route path="/articles/:articleslug" exact component={ViewArticle} />
            <Route path="/articles" component={CreateArticle} />
            <Route path="/tags/:name" component={ViewTag} />
            <Route path="/user/verify/:verificationToken" component={VerifyUser} />
            <Redirect to="/" />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
