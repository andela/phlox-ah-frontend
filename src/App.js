import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import CreateArticle from './containers/createArticle/CreateArticle';

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
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/create' component={CreateArticle} />
        </Switch>
      </div>
    );
  }
}

export default App;
