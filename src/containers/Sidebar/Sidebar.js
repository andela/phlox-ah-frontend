import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Row, Col, Card, CardTitle, Badge
} from 'react-materialize';
import './Sidebar.scss';
import { getArticles } from '../../requests/ArticleRequests';
import { getAllTags } from '../../requests/TagRequests';

let authorAvatar = '';
let articlePic = '';

/**
 * @class Sidebar
 * @extends {Component}
 */
class Sidebar extends Component {
  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof Sidebar
   */
  constructor(props) {
    super();
    this.state = {
      sidebarArticles: [],
      failure: true,
      success: false,
      tags: []
    };
  }

  /**
   *
   * @returns {func} tag
   * @memberof Sidebar
   */
  componentDidMount() {
    this.props.getArticles();
    this.props.getAllTags();
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof Sidebar
   */
  static getDerivedStateFromProps(props, state) {
    return {
      tags: props.tags,
      failure: props.failure,
      sidebarArticles: props.sidebarArticles,
      success: props.success
    };
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof Sidebar
   */
  showSidebarArticles() {
    if (this.state.failure || !this.state.sidebarArticles) {
      return (<div className="preloaderDiv"></div>);
    }
    return this.state.sidebarArticles.slice(0, 4).map((article, index) => {// eslint-disable-line
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
    });
  }

  /**
   *
   *
   * @param {*} x
   * @returns {jsx} - jsx
   * @memberof Sidebar
   */
  showTags() {
    if (this.state.tags.length > 0) {
      return this.state.tags.map((tag, index) => {// eslint-disable-line
        return (<div key={index}>
        <Link to={`/tags/${tag.name}`}><Badge className="cyan">{ tag.name }</Badge></Link></div>);
      });
    }
    return (<div>No tags yet!</div>);
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Sidebar
   */
  render() {
    return (
      <div>
        <h6 className=""><b>Latest Articles</b></h6>
        { this.showSidebarArticles() }
        {/* <span className="title center">Tags</span> */}
        <h6 className=""><b>Tags</b></h6>
        <div className="sidebar-tag-container">
          { this.showTags() }
        </div>
      </div>);
  }
}

const mapStateToProps = state => ({
  tag: state.tags.tag,
  tags: state.tags.tags,
  failure: state.tags.failure,
  sidebarArticles: state.article.articles,
  success: state.tags.success,
});


Sidebar.propTypes = {
  articles: PropTypes.array,
  failure: PropTypes.bool,
  getAllTags: PropTypes.func,
  getArticles: PropTypes.func,
  getTag: PropTypes.func,
  sidebarArticles: PropTypes.array,
  sidebarTitle: PropTypes.string,
  success: PropTypes.bool,
};

export default connect(mapStateToProps, {
  getAllTags, getArticles
})(Sidebar);
