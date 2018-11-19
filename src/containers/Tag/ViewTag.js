import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
// import { Sidebar } from '../../components/Sidebar/Sidebar';
import Sidebar from '../Reusable/Sidebar';
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
      failure: true,
      success: false,
      tag: {},
      tagName: '',
    };
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTag
   */
  static getDerivedStateFromProps(props, state) {
    return {
      failure: props.failure,
      sidebarArticles: [],
      success: props.success,
      tag: props.tag
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
   * @returns {jsx} - jsx
   * @memberof ViewTag
   */
  showTagArticles() {
    if (this.state.success && this.state.tag) {
      return this.state.tag.Articles.map((article, index) => <Col s={12} m={12}
      l={12} xl={6} key={index + 5}>
      <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author="runor" slug={article.slug} />
    </Col>);
    }
    return (<div className="center">No articles under this tag</div>);
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
                  <h4 className="center capitalize">Tag: { this.props.match.params.name }</h4>
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
  failure: state.tags.failure,
  success: state.tags.success,
});

ViewTag.propTypes = {
  articles: PropTypes.array,
  failure: PropTypes.bool,
  getOneTag: PropTypes.func,
  getArticles: PropTypes.func,
  match: PropTypes.object,
  sidebarArticles: PropTypes.array,
  success: PropTypes.bool,
  tag: PropTypes.object
};

export default connect(mapStateToProps, {
  getOneTag, getArticles
})(ViewTag);
