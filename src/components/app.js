import React, { Component } from 'react';
// eslint-disable-next-line
import { render } from 'react-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './home';
import { allArticles } from '../actions/demoArticleActions';

/**
 *
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} -
   */
  // eslint-disable-next-line
  render() {
    return (
      <div>
        <h1>Hello! Welcome to Authors Haven</h1>
        This is the app component
        <button onClick={ () => this.props.allArticles({ title: 'The second title', body: 'The second body' }) }>Tap to test redux in dev tools</button>
        <br /> <br />
        <Home />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.articles,
});

const mapDispatchToProps = dispatch => ({
  allArticles: (articles) => {
    dispatch(allArticles(articles));
  }
});

App.propTypes = {
  articles: PropTypes.object,
  allArticles: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
