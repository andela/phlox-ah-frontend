import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addArticle, getArticles } from '../../requests/ArticleRequests';

/**
 *
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @returns {array} article
   * @memberof Home
   */

  /**
   * @description - This method runs first in the class
   * @returns {object} articles
   * @memberof Home
   */
  constructor() {
    super();
    this.getAllArticles = this.getAllArticles.bind(this);
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @memberof Home
   */
  componentDidMount() {
    this.getAllArticles();
  }

  /**
   *
   * @description - This method adds to the articles
   * @param {*} article
   *  @returns {object} article
   *  @memberof Home
   */
  addToArticles(article) {
    this.props.addArticle(article);
  }

  /**
   * @description - This method gets all articles
   * @memberof Home
   * @returns {array} article
   */
  getAllArticles() {
    this.props.getArticles();
  }

  /**
   *
   * @description - This method lists all articles in jsx
   * @memberof Home
   * @returns {jsx} - jsx
   */
  listArticles() {
    return this.props.articles.map((article, index) => <li key={index}>Title: {article.title},
    description: {article.description}</li>);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Home
   */
  render() {
    return (
      <div>
        This is the home component
        <br /> <br />
        <button onClick={ () => this.addToArticles({ title: 'The second title', body: 'awesome too' }) }>Demo add an article</button>
        <button onClick={ () => this.getAllArticles() }>Get all articles</button>
        <ul>
          { this.listArticles() }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.demoArticleReducer.articles,
});

Home.propTypes = {
  articles: PropTypes.array,
  addArticle: PropTypes.func,
  getArticles: PropTypes.func
};

export default connect(mapStateToProps, { addArticle, getArticles })(Home);
