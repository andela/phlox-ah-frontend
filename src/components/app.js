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
   * @description -This method renders
   * @returns {view} -
   */

  // eslint-disable-next-line
  render() {
    return (
      <div>
        <h1>Hello! Welcome to Authors Haven</h1>
        This is the app component
        <button onClick={ () => this.props.allArticles({ title: 'awesome', body: 'The body' }) }>Click to test redux</button>
        <br /> <br />
        <Home />
      </div>
    );
  }
}

App.propTypes = {
  articles: PropTypes.object,
  allArticles: PropTypes.func
};

const mapStateToProps = state => ({
  articles: state.articles,
});

const mapDispatchToProps = dispatch => ({
  allArticles: (articles) => {
    dispatch(allArticles(articles));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
