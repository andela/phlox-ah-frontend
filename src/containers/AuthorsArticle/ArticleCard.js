import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleCard = props => (
    <li className="article">
      <div className="photo">
        <img
          src={props.article.imgUrl || props.placeholderImg }
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
          <a>
            VIEW ARTICLE
          </a>
        </span>
        <span className="edit">
          <Link to={`/articles/${props.article.slug}/${props.article.status}/edit`}>
            <i className="fas fa-edit"></i>
          </Link>
        </span>
        <span className="delete">
          <button onClick={() => props.deleteArticle(props.article.slug)}>
            <i className="fas fa-trash-alt"></i>
          </button>
        </span>
      </div>
    </li>
);

ArticleCard.propTypes = {
  article: PropTypes.shape({
    slug: PropTypes.string,
    status: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
    imgUrl: PropTypes.string,
  }),
  placeholderImg: PropTypes.string,
  deleteArticle: PropTypes.func
};

export default ArticleCard;
