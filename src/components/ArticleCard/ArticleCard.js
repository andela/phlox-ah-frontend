import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Row, Col, Card, CardTitle
} from 'react-materialize';
import './ArticleCard.scss';

export const ArticleCard = props => (
  <div>
    <Card className={`${props.size} articleCard`}
        header={<CardTitle image={props.pic}>
        {props.title}</CardTitle>}
        actions={[<a href='#' key={0}>Share</a>, <a href='#' key={0}>View Article</a>, <span key={0}>{moment(props.createdAt).format('D MMMM YYYY')}</span>, <span key={0}>{props.author}</span>]}>
        <span className="hide-on-large-only">{props.description.substring(0, 120)}</span>
        <span className="hide-on-med-and-down">{props.description.substring(0, 90)}</span>
      </Card>
  </div>
);

ArticleCard.propTypes = {
  author: PropTypes.string,
  description: PropTypes.string,
  createdAt: PropTypes.string,
  title: PropTypes.string,
  pic: PropTypes.string,
  size: PropTypes.string
};

export default ArticleCard;
