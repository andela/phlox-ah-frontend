import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/Button/ExampleButton';
import { AddArticle, GetArticles } from '../../requests/ArticleRequests';

/**
 *
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} -
   */
  // eslint-disable-next-line
  componentDidMount() {
    this.props.GetArticles();
  }
  // eslint-disable-next-line
  addToArticles(article) {
    this.props.AddArticle(article);
  }
  // eslint-disable-next-line
  getAllArticles() {
    this.props.GetArticles();
  }

  listArticles() {
    return this.props.articles.map((article, index) => <li key={index}>Title: {article.title},
    description: {article.description}</li>);
  }
  // eslint-disable-next-line
  render() {
    return (
      <div>
        This is the home component
        <br /> <br />
        <Button text='This button is from a component'></Button> <br /> <br />
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
  articles: state.DemoArticleReducer.articles,
});

Home.propTypes = {
  articles: PropTypes.array,
  AddArticle: PropTypes.func,
  GetArticles: PropTypes.func
};

export default connect(mapStateToProps, { AddArticle, GetArticles })(Home);
