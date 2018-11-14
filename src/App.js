import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
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
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute exact path="/articles" component={CreateArticle} />
            <PrivateRoute path='/profile/edit' component={EditProfile} />
            <PrivateRoute path='/profile' component={ViewProfile} />
            <PrivateRoute path="/articles/:slug/edit" component={CreateArticle} />
            <Route path="/password/forgot-success" component={SentResetPasswordMail} />
            <Route path="/password/reset/:token" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
