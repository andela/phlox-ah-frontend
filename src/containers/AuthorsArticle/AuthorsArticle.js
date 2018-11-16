import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyArticles } from '../../containers/BasePath';
import ArticleCard from './ArticleCard';
import DeleteModal from '../DeleteModal/DeleteModal';


import './AuthorsArticle.scss';


class AuthorsArticle extends Component {


  constructor() {
    super();

    this.state = {
      showDeleteModal: false,
      articleslug: null
    };

    this.deleteArticle = this.deleteArticle.bind(this);
    this.hideDeleteModal = this.hideDeleteModal.bind(this);
  }

  componentDidMount() {
    this.props.getMyArticles();
  }

  deleteArticle(articleslug) {
    this.setState({
      showDeleteModal: true,
      articleslug
    });
  }

  hideDeleteModal() {
    this.setState({
      showDeleteModal: false,
      articleslug: null
    });
  }

  renderArticles(articles=[]) {

    const placeholderImg = "https://via.placeholder.com/300?text=AuthorsHaven";

    return articles.map(article => {
      return (
        <ArticleCard 
          placeholderImg={placeholderImg}
          deleteArticle={this.deleteArticle}
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
          { articles.length ? 
              this.renderArticles(articles) :
              (
                <li className="myarticle-info">
                  You have no article created yet
                </li>
              )
          }
        </ul>
        {
          this.state.showDeleteModal &&
            <DeleteModal 
              hideDeleteModal={this.hideDeleteModal}
              articleslug={this.state.articleslug}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  articles: state.myArticle.articles
});

export default connect(mapStateToProps, {getMyArticles})(AuthorsArticle);


