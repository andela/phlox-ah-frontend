import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import Signup from './containers/Signup/Signup';
import PrivateRoute from './PrivateRoute';
import ViewArticle from './containers/ViewAnArticle/ViewArticle';

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
        <div>
          <Switch>
            <PrivateRoute path='/profile/edit' component={EditProfile} />
            <PrivateRoute path='/profile' component={ViewProfile} />
            <Route path="/" exact component={Home} />
            <Route path="/password/forgot" component={ForgotPassword} />
            <Route path="/password/reset/:token" component={ResetPassword} />
            <Route path="/articles/:articleslug" exact component={ViewArticle} />
            <Route path="/articles" component={CreateArticle} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
