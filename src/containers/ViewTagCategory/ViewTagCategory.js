import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Sidebar from '../Sidebar/Sidebar';
import { getOneTag } from '../../requests/TagRequests';
import { getCategoryArticle } from '../../requests/CategoryRequests';
import { getArticles } from '../../requests/ArticleRequests';
import './ViewTagCategory.scss';


/**
 * @class ViewTagCategory
 * @extends {Component}
 */
class ViewTagCategory extends Component {
  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof ViewTagCategory
   */
  constructor(props) {
    super();
    this.state = {
      success: false,
      tag: {},
      tagName: '',
      categorySelected: false,
      categories: []
    };

    this.getTag = this.getTag.bind(this);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof ViewTagCategory
   */
  static getDerivedStateFromProps(props, state) {
    const { category, name } = props.match.params;
    if (name !== state.tagName) {
      props.getOneTag(name);
    }
    return {
      success: props.success,
      tag: props.tag,
      tagName: name,
      categories: props.categories,
      categorySelected: Boolean(category)
    };
  }

  /**
   *
   * @returns {func} tag
   * @memberof ViewTagCategory
   */
  componentDidMount() {
    const { category, name } = this.props.match.params;
    if (category) {
      this.setState({ categorySelected: true });
      this.props.getCategoryArticle(category);
    } else {
      this.props.getOneTag(name);
    }
    this.props.getArticles();
  }

  /**
   *
   *
   * @param {*} name
   * @returns {func} tag
   * @memberof ViewTagCategory
   */
  getTag(name) {
    this.props.getOneTag(name);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof ViewTagCategory
   */
  showTagArticles() {
    if (this.state.success && this.state.tag) {
      return this.state.tag.Articles.map((article, index) => {
        let username = '';
        if (article.User) {
          username = article.User.username;
        }
        return (<Col s={12} m={12}
        l={12} xl={6} key={article.id}>
        <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author={username} slug={article.slug} tags={article.Tags} />
        </Col>);
      });
    }
    return (<h5 className="center no-tags">There are no articles under this tag</h5>);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof ViewTagCategory
   */
  showCategoryArticles() {
    if (this.state.success && this.state.categories.length) {
      return this.state.categories.map((article, index) => {
        let username = '';
        if (article.User) {
          username = article.User.username;
        }
        return (<Col s={12} m={12}
        l={12} xl={6} key={article.id}>
        <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author={username} slug={article.slug} tags={article.Tags} />
        </Col>);
      });
    }
    return (<h5 className="center no-tags">There are no articles under this category</h5>);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof ViewTagCategory
   */
  render() {
    return (
      <div>
         <main>
          <div className="site-container">
          <Row>
              <Col s={12} m={12} l={8} xl={9} className="column-1">
                <Row>
                  <h5 className="center capitalize">{this.state.categorySelected ? 'Category' : 'Tag'}: { this.state.categorySelected ? this.props.match.params.category : this.props.match.params.name }</h5>
                  { this.state.categorySelected ? this.showCategoryArticles() : this.showTagArticles() }
                </Row>
              </Col>
              <Col s={12} m={9} l={4} xl={3} className="sidebar">
                <Sidebar />
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
  categories: state.category.categoryArticle,
  success: state.tags.success,
  loading: state.category.loading
});

ViewTagCategory.propTypes = {
  articles: PropTypes.array,
  getOneTag: PropTypes.func,
  getArticles: PropTypes.func,
  getCategoryArticle: PropTypes.func,
  match: PropTypes.object,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  tag: PropTypes.object
};

export default connect(mapStateToProps, {
  getOneTag, getArticles, getCategoryArticle
})(ViewTagCategory);
