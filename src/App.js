import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
import Header from './containers/Header/Header';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Login from './containers/Login/Login';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import PrivateRoute from './PrivateRoute';
import ViewArticle from './containers/ViewAnArticle/ViewArticle';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';

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
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/articles" component={CreateArticle} />
            <PrivateRoute exact path='/profile' component={ViewProfile} />
            <PrivateRoute exact path='/profile/edit' component={EditProfile} />
            <PrivateRoute exact 
              path="/articles/:articleslug/:articlestatus/edit" 
              component={CreateArticle} 
            />
            <PrivateRoute exact path="/articles/:articleslug" component={ViewArticle} />
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
