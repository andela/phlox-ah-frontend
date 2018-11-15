import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, CardTitle
} from 'react-materialize';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import './Home.scss';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { CarouselSlider } from '../../components/CarouselSlider/CarouselSlider';
import { getArticles } from '../../requests/ArticleRequests';
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
      success: false,
      carouselArticles: [],
      categories: [],
      popularArticles: [],
      sidebarArticles: [],
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
      success: props.success,
      carouselArticles: props.articles.slice(0, 3),
      categories: props.categories,
      sidebarArticles: props.articles.slice(0, 4),
      trendingArticles: props.articles.slice(0, 2),
      popularArticles: props.articles.slice(0, 2)
    };
  }

  /**
    *
    * @returns {func} article
    * @memberof Home
    */
  componentDidMount() {
    this.props.getArticles();
    this.props.getAllCategory();
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  trendingArticles() {
    return this.state.trendingArticles.map((article, index) => <Col s={12} m={12}
    l={12} xl={6} key={index + 3}>
    <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author={article.User.username} slug={article.slug} />
  </Col>);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  popularArticles() {
    return this.state.popularArticles.map((article, index) => <Col s={12} m={12}
    l={12} xl={6} key={index + 5}>
    <ArticleCard size="medium" pic={article.imgUrl} title={article.title} description={article.description} createdAt={article.createdAt} author={article.User.username} slug={article.slug} />
  </Col>);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  showCategories() {
    return this.state.categories.slice(0, 2).map((category, index) => <div key={index}><Row>
    <Col s={12} l={12}>
    <div className="row-header valign-wrapper">
    <h6><b>{category.category}</b></h6>
    <span className="right grey-text text-darken-2">More <i className='fas fa-angle-right'></i> </span>
    </div>
    </Col> </Row>
    <Row>{ this.popularArticles() }</Row></div>);
  }

  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  showCarousel() {
    return (<CarouselSlider articles={this.state.carouselArticles} />);
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
                    {!this.state.success
                      ? <div>djkdjdj</div>
                      : this.showCarousel()
                      }
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
                      <span className="right grey-text text-darken-2">More <i className='fas fa-angle-right'></i> </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  { this.popularArticles() }
                </Row>
                { this.showCategories() }
                <Row>
                  <Col s={12} l={12}>
                    <div className="row-header valign-wrapper">
                      <h6><b>Sports</b></h6>
                      <span className="right grey-text text-darken-2">More <i className='fas fa-angle-right'></i> </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  { this.popularArticles() }
                </Row>
              </Col>
              <Col s={0} m={1} l={0} xl={0} ></Col>
              <Col s={12} m={9} l={4} xl={3} className="sidebar">
                <Sidebar sidebarTitle="Latest" articles={this.state.sidebarArticles} />
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
  loading: state.article.loading,
  success: state.article.success,
});

Home.propTypes = {
  actions: PropTypes.array,
  getArticles: PropTypes.func,
  articles: PropTypes.array,
  failure: PropTypes.bool,
  getAllCategory: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, { getArticles, getAllCategory })(Home);
