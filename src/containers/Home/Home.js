import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, CardTitle
} from 'react-materialize';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import './Home.scss';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
// import { Sidebar } from '../../components/Sidebar/Sidebar';
import Sidebar from '../Reusable/Sidebar';
import { CarouselSlider } from '../../components/CarouselSlider/CarouselSlider';
import { getArticles, getFeaturedArticles, getPopularArticles } from '../../requests/ArticleRequests';
import { getAllCategory } from '../../requests/CategoryRequests';

/**
 *
 *
 * @class Home
 * @extends {Component}
 */
class Home extends Component {
  /**
   * @returns {array} article
   * @memberof Home
   */

  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof Home
   */
  constructor(props) {
    super();
    this.state = {
      categories: [],
      failure: true,
      featuredArticles: [],
      popularArticles: [],
      success: false,
      trendingArticles: []
    };
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof Header
   */
  static getDerivedStateFromProps(props, state) {
    if (document.querySelector('.carousel')) {
      const elem = document.querySelector('.carousel');
      const instance = M.Carousel.getInstance(elem);
      setInterval(() => {
        instance.next();
      }, 5000);
    }
    return {
      categories: props.categories,
      failure: props.failure,
      featuredArticles: props.featuredArticles,
      popularArticles: props.popularArticles,
      success: props.success,
      trendingArticles: props.articles.slice(0, 2)
    };
  }

  /**
    *
    * @returns {func} article
    * @memberof Home
    */
  componentDidMount() {
    this.props.getArticles();
    this.props.getFeaturedArticles();
    this.props.getPopularArticles();
    this.props.getAllCategory();
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  carousel() {
    if (!this.state.success || this.state.failure) {
      return (<div className="preloaderDiv"></div>);
    }
    return (<CarouselSlider articles={this.state.featuredArticles} />);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  popularArticles() {
    if (this.state.failure || !this.state.popularArticles) {
      return (<div className="preloaderDiv"></div>);
    }
    return this.listArticles(this.state.popularArticles);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  showCategories() {
    if (this.state.failure || !this.state.popularArticles) {
      return (<div className="preloaderDiv"></div>);
    }
    const categories = this.state.categories.filter(category => category.articles.length > 0);
    return categories.slice(0, 3).map((category, index) => <div key={index}><Row>
    <Col s={12} l={12}>
    <div className="row-header valign-wrapper">
    <h6 className="capitalize"><b>{category.category}</b></h6>
    </div>
    </Col> </Row>
    <Row>{ this.listArticles(category.articles.slice(0, 1)) }</Row></div>);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  trendingArticles() {
    if (this.state.failure || !this.state.trendingArticles) {
      return (<div className="preloaderDiv"></div>);
    }
    return this.listArticles(this.state.trendingArticles);
  }

  /**
   *
  * @param {*} articles
   * @returns {jsx} - jsx
   * @memberof Home
   */
  listArticles(articles) {
    return articles.map((article, index) => <Col s={12} m={12}
    l={12} xl={6} key={index + 5}>
    <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author="runor" slug={article.slug} />
  </Col>);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Home
   */
  render() {
    return (
      <div>
        <main>
          <div className="site-container">
            <Row>
              <Col s={12} m={12} l={8} xl={9} className="column-1">
                <Row>
                  <Col s={12} l={12}>
                    <div className="row-header valign-wrapper">
                      <h6><b>Editors Pick</b></h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col s={12} l={12}>
                      {this.carousel()}
                  </Col>
                </Row>
                <Row>
                  <Col s={12} l={12}>
                    <div className="row-header valign-wrapper">
                      <h6><b>Trending Articles</b></h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  { this.trendingArticles() }
                </Row>
                <Row>
                  <Col s={12} l={12}>
                    <div className="row-header valign-wrapper">
                      <h6><b>Popular On Authors Haven</b></h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  { this.popularArticles() }
                </Row>
                { this.showCategories() }
              </Col>
              <Col s={0} m={1} l={0} xl={0} ></Col>
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
  categories: state.category.categories,
  failure: state.article.failure,
  featuredArticles: state.article.featuredArticles,
  popularArticles: state.article.popularArticles,
  success: state.article.success,
});

Home.propTypes = {
  actions: PropTypes.array,
  articles: PropTypes.array,
  categories: PropTypes.array,
  failure: PropTypes.bool,
  featuredArticles: PropTypes.array,
  getAllCategory: PropTypes.func,
  getArticles: PropTypes.func,
  getFeaturedArticles: PropTypes.func,
  getPopularArticles: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  getArticles, getAllCategory, getFeaturedArticles, getPopularArticles
})(Home);
