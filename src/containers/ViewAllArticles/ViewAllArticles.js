import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Sidebar from '../Sidebar/Sidebar';
import { getArticles } from '../../requests/ArticleRequests';
import './ViewAllArticles.scss';


/**
 * @class ViewAllArticles
 * @extends {Component}
 */
class ViewAllArticles extends Component {
  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof ViewAllArticles
   */
  constructor(props) {
    super();
    this.state = {
      success: false,
      articles: []
    };
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   */
  static getDerivedStateFromProps(props) {
    return props;
  }

  /**
   * @returns {func} tag
   */
  componentDidMount() {
    this.props.getArticles();
  }


  /**
   * @description - This method shows all articles
   * @returns {jsx} - jsx
   */
  showAllArticles() {
    const { articles } = this.state;
    return articles.map((article) => {
      const username = article.User ? article.User.username : '';
      return (
        <Col s={12} m={12} l={12} xl={6} key={article.id}>
          <ArticleCard
            size="medium"
            pic={article.imgUrl}
            title={article.title}
            description={article.description}
            createdAt={article.createdAt}
            author={username}
            slug={article.slug}
          />
        </Col>);
    });
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   */
  render() {
    const { success } = this.state;
    return (
      <div>
         <main>
          <div className="site-container">
          <Row>
              <Col s={12} m={12} l={8} xl={9} className="column-1">
                <Row>
                  { success ? this.showAllArticles() : <h5 className="center no-tags">There are no articles at the moment</h5> }
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
  success: state.article.success
});

ViewAllArticles.propTypes = {
  articles: PropTypes.array,
  getArticles: PropTypes.func,
  match: PropTypes.object,
  success: PropTypes.bool
};

export default connect(mapStateToProps, { getArticles })(ViewAllArticles);
