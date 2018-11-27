import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';

import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import Sidebar from '../Sidebar/Sidebar';
import { searchArticles } from '../../requests/SearchRequests';
import './SearchArticles.scss';


/**
 * @class ViewAllArticles
 * @extends {Component}
 */
class SearchArticles extends Component {
  /**
   *Creates an instance of Home.
   * @param {object} props
   * @memberof ViewAllArticles
   */
  constructor(props) {
    super();
    this.initialState = { searchBy: 'article', query: '' };

    this.state = { ...this.initialState };

    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
    this.swithSearchBy = this.swithSearchBy.bind(this);
  }

  /**
   * @returns {func} tag
   */
  componentDidMount() {
    const { search } = this.props.location;
    if (search) {
      this.props.searchArticles({ query: search, searchBy: 'article' });
    }
  }

  /**
   * @memberOf handleChangeEvent
   * @method handleChangeEvent
   * @param {*} e
   * @return {*} setstate
   */
  change(e) {
    this.setState({
      query: e.target.value
    });
  }

  /**
   * @description - This method changes the searchBy filter
   * @param {objecj} e
   * @returns {object} null
   * @memberof SearchArticles
   */
  swithSearchBy(e) {
    const searchBy = e.target.value;
    const searchQuery = `?${searchBy}=${this.state.query}`;
    this.props.searchArticles({ query: searchQuery, searchBy });
    this.setState({
      searchBy
    });
  }

  /**
   * @description - This method runs when search form is submitted
   * @param {objecj} e
   * @returns {object} null
   * @memberof SearchArticles
   */
  submit(e) {
    e.preventDefault();
    const { searchBy, query } = this.state;
    const searchQuery = `?${searchBy}=${query}`;
    this.props.searchArticles({ query: searchQuery, searchBy });
  }

  /**
   * @description - This method shows all articles
   * @returns {jsx} - jsx
   */
  showSearchedArticles() {
    const { searchResult } = this.props;
    return searchResult.map((article) => {
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
    const {
      success, failure, loading, error
    } = this.props;
    const { searchBy, query } = this.state;

    return (
      <div>
        <main>
          <div className="site-container ">
          <div className="my-container">
            <Row>
              <Col s={12}>
                <Row>
                  <Row>
                    <Col s={12} className="column-2">
                    <form onSubmit={this.submit}>
                      <input
                        type="text"
                        onChange={this.change}
                        placeholder="Search authors heaven"
                        name={'query'}
                        value={query}
                        className="searchInput"
                        id="searchInput"
                      />
                      <Row className="filter-row">
                        <Col s={2}>
                          <h6 className="text-bold">Search By: </h6>
                        </Col>
                        <Col s={10}>
                          <input
                            className={searchBy === 'author' ? 'active' : ''}
                            type="button" value={'author'} onClick={this.swithSearchBy}
                            name="myname"
                          /><span className="divider">|</span>
                          <input
                            className={searchBy === 'article' ? 'active' : ''}
                            type="button"
                            value={'article'}
                            onClick={this.swithSearchBy}
                            name="myname"
                          /><span className="divider">|</span>
                          <input
                            className={searchBy === 'tag' ? 'active' : ''}
                            type="button"
                            value={'tag'}
                            onClick={this.swithSearchBy}
                            name="myname"
                          />
                        </Col>
                      </Row>
                    </form>
                    </Col>
                  </Row>
                  <div className="mt-5">
                    {success && this.showSearchedArticles() }
                    { failure && <h5 className="center">{ error }</h5>}
                    { loading && <h5 className="center">loading...</h5>}
                  </div>
                </Row>
              </Col>
            </Row>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles,
  loading: state.search.loading,
  success: state.search.success,
  failure: state.search.failure,
  error: state.search.error,
  searchResult: state.search.searchResult
});

SearchArticles.propTypes = {
  searchResult: PropTypes.array,
  searchArticles: PropTypes.func,
  match: PropTypes.object,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  failure: PropTypes.bool,
  error: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string
  })
};

export default connect(mapStateToProps, { searchArticles })(SearchArticles);
