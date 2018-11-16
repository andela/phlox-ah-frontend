import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyArticles } from '../BasePath';
import ArticleCard from './ArticleCard';
import DeleteModal from '../DeleteModal/DeleteModal';


import './AuthorsArticle.scss';

/**
 *
 *
 * @class AuthorsArticle
 * @extends {Component}
 */
class AuthorsArticle extends Component {
  /**
   * @member of AuthorsArticle
   */

  /**
   * @description - This method runs first in the class
   * @returns {object} null
   * @memberof AuthorsArticle
   */
  constructor() {
    super();

    this.state = {
      showDeleteModal: false,
      articleslug: null
    };

    this.deleteArticle = this.deleteArticle.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} null
   * @memberof AuthorsArticle
   */
  componentDidMount() {
    this.props.getMyArticles();
  }

  /**
   * @description - This method get the slug of the article to be deleted
   * @param {string} slug
   * @returns {object} profile
   * @memberof AuthorsArticle
   */
  deleteArticle(articleslug) {
    this.setState({
      showDeleteModal: true,
      articleslug
    });
  }

  /**
   * @description - This method hides the delete modal
   * @returns {object} null
   * @memberof AuthorsArticle
   */
  hideDeleteModal() {
    this.setState({
      showDeleteModal: false,
      articleslug: null
    });
  }

  /**
   * @description - This method creats article card
   * @param {array} articles
   * @returns {jsx} - jsx
   * @memberof AuthorsArticle
   */
  renderArticles(articles = []) {
    const placeholderImg = 'https://via.placeholder.com/300?text=AuthorsHaven';

    return articles.map(article => (
        <ArticleCard
          placeholderImg={placeholderImg}
          deleteArticle={this.deleteArticle}
          key={ article.id }
          article={ article }
          {...this.props}
        />
    ));
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof AuthorsArticle
   */
  render() {
    const { articles } = this.props;

    return (
      <div className="authors-article">
        <div className="heading">
          My Recent Articles
        </div>
        <ul className="articles-wrapper">
          { articles.length
            ? this.renderArticles(articles)
            : (
                <li className="myarticle-info">
                  You have no article created yet
                </li>
            )
          }
        </ul>
        {
          this.state.showDeleteModal
            && <DeleteModal
              hideDeleteModal={this.hideDeleteModal}
              articleslug={this.state.articleslug}
            />
        }
      </div>
    );
  }
}

AuthorsArticle.propTypes = {
  articles: PropTypes.array,
  getMyArticles: PropTypes.func
};


const mapStateToProps = state => ({
  articles: state.myArticle.articles
});

export default connect(mapStateToProps, { getMyArticles })(AuthorsArticle);
