import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Row, Col, Card, CardTitle
} from 'react-materialize';
import './Sidebar.scss';
import { ok } from 'assert';

let authorAvatar = '';
let articlePic = '';

export const Sidebar = props => (
  <div>
    <h6 className=""><b>{props.sidebarTitle}</b></h6>
    { props.articles.map((article, index) => {// eslint-disable-line
      if (!article.User.Profile || !article.User.Profile.profileImage) {
        authorAvatar = <Avatar name={article.User.username} size="20" round={true} />;
      } else {
        authorAvatar = <img className="img-responsive circle" src={article.User.Profile.profileImage}/>;
      }
      if (!article.imgUrl) {
        articlePic = 'https://via.placeholder.com/300?text=AuthorsHaven';
      } else {
        articlePic = article.imgUrl;
      }
      return (<Row key={ index + 1 }>
        <Col s={12} m={12}>
          <Card className="z-depth-1" horizontal header={<CardTitle image={articlePic}></CardTitle>}>
              <h6 className="capitalize"><b> <Link key={0} className="capitalize" to={`/articles/${article.slug}`}>{article.title.substring(0, 25)}</Link> </b></h6>
              <p>{article.description.substring(0, 45)}.<br/>
                </p>
                <Row className="author-details valign-wrapper">
                  <Col s={12} l={3} className="center-align">
                    { authorAvatar }
                  </Col>
                  <Col s={12} l={9}>
                    <p className="text-darken-4"><span><b>{article.User.username}</b></span> <span>{moment(article.createdAt).format('MMMM D YYYY')}</span></p>
                  </Col>
                </Row>
            </Card>
        </Col>
      </Row>);
    }) }
  </div>
);

Sidebar.propTypes = {
  articles: PropTypes.array,
  sidebarTitle: PropTypes.string,
};

export default Sidebar;
