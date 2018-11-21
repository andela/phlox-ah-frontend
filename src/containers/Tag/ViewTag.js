import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Sidebar from '../Sidebar/Sidebar';
import { getOneTag } from '../../requests/TagRequests';
import { getArticles } from '../../requests/ArticleRequests';
import './ViewTag.scss';


/**
 * @class ViewTag
 * @extends {Component}
 */
class ViewTag extends Component {
  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof ViewTag
   */
  constructor(props) {
    super();
    this.state = {
      success: false,
      tag: {},
      tagName: '',
    };

    this.getTag = this.getTag.bind(this);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTag
   */
  static getDerivedStateFromProps(props, state) {
    if (props.match.params.name !== state.tagName) {
      props.getOneTag(props.match.params.name);
    }
    return {
      success: props.success,
      tag: props.tag,
      tagName: props.match.params.name
    };
  }

  /**
   *
   * @returns {func} tag
   * @memberof ViewTag
   */
  componentDidMount() {
    this.props.getOneTag(this.props.match.params.name);
    this.props.getArticles();
  }

  /**
   *
   *
   * @param {*} name
   * @returns {func} tag
   * @memberof ViewTag
   */
  getTag(name) {
    this.props.getOneTag(name);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof ViewTag
   */
  showTagArticles() {
    if (this.state.success && this.state.tag) {
      return this.state.tag.Articles.map((article, index) => {
        let username = '';
        if (article.User) {
          username = article.User.username;// eslint-disable-line
        }
        return (<Col s={12} m={12}
        l={12} xl={6} key={index + 5}>
        <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author={username} slug={article.slug} />
        </Col>);
      });
    }
    return (<h5 className="center no-tags">There are no articles under this tag</h5>);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof ViewTag
   */
  render() {
    return (
      <div>
         <main>
          <div className="site-container">
          <Row>
              <Col s={12} m={12} l={8} xl={9} className="column-1">
                <Row>
                  <h5 className="center capitalize">Tag: { this.props.match.params.name }</h5>
                  { this.showTagArticles() }
                </Row>
              </Col>
              <Col s={12} m={9} l={4} xl={3} className="sidebar">
                <Sidebar/>
              </Col>
          </Row>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles,
  tag: state.tags.tag,
  success: state.tags.success,
});

ViewTag.propTypes = {
  articles: PropTypes.array,
  getOneTag: PropTypes.func,
  getArticles: PropTypes.func,
  match: PropTypes.object,
  success: PropTypes.bool,
  tag: PropTypes.object
};

export default connect(mapStateToProps, {
  getOneTag, getArticles
})(ViewTag);
