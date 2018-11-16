import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyArticles } from '../BasePath';
import ArticleCard from './ArticleCard';

import './AuthorsArticle.scss';


class AuthorsArticle extends Component {

  componentDidMount() {
    this.props.getMyArticles();
  }

  editSelected(articleId) {
    console.log(articleId);
  }

  renderArticles(articles=[]) {

    const placeholderImg = "https://via.placeholder.com/300?text=AuthorsHaven";

    return articles.map(article => {
      return (
        <ArticleCard 
          placeholderImg={placeholderImg}
          key={ article.id } 
          article={ article } 
          {...this.props}
        />
      )
    });
  }

  render() {

    const { articles } = this.props;

    return (
      <div className="authors-article">
        <div className="heading">
          My Recent Articles
        </div>
        <ul className="articles-wrapper">
          {this.renderArticles(articles)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  articles: state.myArticle.articles
});

export default connect(mapStateToProps, {getMyArticles})(AuthorsArticle);


