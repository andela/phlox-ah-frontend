import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import CreateArticle from './containers/createArticle/CreateArticle';

import './App.scss';
import HomePage from './components/Pages/HomePage';
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
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/new-story' component={CreateArticle} />
        </Switch>
      </div>
    );
  }
}

export default App;
