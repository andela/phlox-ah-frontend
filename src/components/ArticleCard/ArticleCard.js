import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card, CardTitle
} from 'react-materialize';
import './ArticleCard.scss';

let articlePic = '';

export const ArticleCard = (props) => {
  if (props.pic === 'null') {
    articlePic = `https://via.placeholder.com/50?text=AuthorsHaven-${props.title.substring(0, 20)}`;
  } else {
    articlePic = props.pic;
  }
  return (
    <div>
      <Card className={`${props.size} hoverable articleCard`}
        header={
          <CardTitle image={articlePic}>
            <Link key={props.slug} className="capitalize" to={`/articles/${props.slug}`}>
              {props.title.substring(0, 50)}
            </Link>
          </CardTitle>}
        actions={[
          <Link to={'#'} key={props.slug}>Share</Link>,
          <Link key={props.slug} to={`/articles/${props.slug}`}>View Article</Link>,
          <span key={props.slug}>{moment(props.createdAt).format('D MMMM YYYY')}</span>,
          <span key={props.slug}>{props.author}</span>
        ]}>
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
