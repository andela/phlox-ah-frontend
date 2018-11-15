import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Article = (props) => {
  return (
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
          <a href="#">VIEW ARTICLE</a>
        </span>
        <span className="edit">
          <Link to={`/articles/${props.article.slug}/${props.article.status}/edit`}>
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

Article.propTypes = {
  props: PropTypes.object,
};

export default Article;
