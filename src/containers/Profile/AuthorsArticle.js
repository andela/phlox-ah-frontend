import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AuthorsArticle.scss';
import { getMyArticles } from '../BasePath';
import { Link } from 'react-router-dom';



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
        <Article 
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


function Article (props){
  return (
    <li className="article">
      <div className="photo">
        <img 
          src={props.imgUrl || props.placeholderImg } 
          alt="article-photo" 
        />
        <div className="title">
          {props.article.title}
        </div>
      </div>
      <div className="preview">
        {props.article.description}
      </div>
      <div className="footer">
        <span className="share">
          <a href="#">SHARE</a>
        </span>
        <span className="view">
          <a href="#">VIEW ARTICLE</a>
        </span>
        <span className="edit">
          <Link to={`/articles/${props.article.slug}/slug`}>
            <i className="fas fa-edit"></i>
          </Link>
        </span>
        <span className="delete">
          <button>
            <i className="fas fa-trash-alt"></i>
          </button>
        </span>
      </div>
    </li>
  )
}
