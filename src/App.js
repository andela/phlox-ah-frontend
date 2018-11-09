import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './containers/Header/Header';
import Login from './containers/Login/Login';
import LoginForm from './components/Pages/LoginPage';
import HomePage from './components/Pages/HomePage';
import ViewProfile from './containers/Profile/ViewProfile';
import EditProfile from './containers/Profile/Profile';
import MsgInfo from './containers/MsgInfo/MsgInfo';

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
        <Login />
        <MsgInfo />
        <div>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/profile" exact component={ViewProfile} />
            <Route path="/profile/edit" exact component={EditProfile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
