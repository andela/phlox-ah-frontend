import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Row, Col, Card, CardTitle
} from 'react-materialize';
import './ArticleCard.scss';

let articlePic = '';
export const ArticleCard = (props) => {
  if (!props.pic) {
    articlePic = 'https://via.placeholder.com/300?text=AuthorsHaven';
  } else {
    articlePic = props.pic;
  }
  return (
  <div>
    <Card className={`${props.size} hoverable articleCard`}
        header={<CardTitle image={articlePic}>
        {props.title}</CardTitle>}
        actions={[<a href='#' key={0}>Share</a>, <Link key={0} to={`/articles/${props.slug}`}>View Article</Link>, <span key={0}>{moment(props.createdAt).format('D MMMM YYYY')}</span>, <span key={0}>{props.author}</span>]}>
        <span className="hide-on-large-only">{props.description.substring(0, 120)}</span>
        <span className="hide-on-med-and-down">{props.description.substring(0, 90)}</span>
      </Card>
  </div>);
};

ArticleCard.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  pic: PropTypes.string,
  size: PropTypes.string,
  slug: PropTypes.string
};

export default ArticleCard;
