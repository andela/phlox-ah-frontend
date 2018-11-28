import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import Home from './containers/Home/Home';
import Signup from './containers/Signup/Signup';
import Followings from './containers/Followings/Followings';
import Followers from './containers/Followings/Followers';
import ForgotPassword from './containers/Password/ForgotPassword';
import ResetPassword from './containers/Password/ResetPassword';
import PrivateRoute from './PrivateRoute';
import { SentResetPasswordMail } from './components/SentResetPasswordMail/SentResetPasswordMail';
import ViewArticle from './containers/ViewArticle/ViewArticle';
import VerifyUser from './containers/VerifyUser/VerifyUser';
import SearchArticles from './containers/SearchArticles/SearchArticles';
import Settings from './containers/Settings/Settings';
import ViewTag from './containers/Tag/ViewTag';
import ViewAllArticles from './containers/ViewAllArticles/ViewAllArticles';

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
            <PrivateRoute exact
              path="/articles/:articleslug/:articlestatus/edit"
              component={CreateArticle}
            />
            <PrivateRoute path="/profile/edit" component={EditProfile} />
            <PrivateRoute path="/following" component={Followings} />
            <PrivateRoute path="/followers" component={Followers} />
            <PrivateRoute path="/profile" component={ViewProfile} />
            <Route path="/" exact component={Home} />
            <Route path="/password/forgot-success" component={SentResetPasswordMail} />
            <Route path="/password/reset/:token" component={Home} />
            <Route path="/articles/feed" exact component={ViewAllArticles} />
            <Route path="/articles/:articleslug" exact component={ViewArticle} />
            <Route path="/settings" component={Settings} />
            <Route path="/articles" component={CreateArticle} />
            <Route path="/search" component={SearchArticles} />
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
