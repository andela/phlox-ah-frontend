import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Row } from 'react-materialize';
import './ViewArticle.scss';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import StarRatings from 'react-star-ratings';
import ArticleTags from '../../components/Tags/ArticleTags';
import { viewArticle, rateArticle } from '../../requests/ArticleRequests';

/**
 * @class ViewAnArticle
 * @extends {Component}
 */
class ViewArticle extends Component {
  /**
   * @constructor function
   * @param {*} props React properties
   */
  constructor(props) {
    super(props);
    this.state = {
      success: false, loading: false, failure: false, article: []
    };
    this.addRating = this.addRating.bind(this);
    console.log(props)
    console.log(window.location.href)
  }


  // eslint-disable-next-line require-jsdoc
  addRating(newRating, name) {
    this.props.rateArticle(this.props.match.params.articleslug, newRating);
  }


  /**
   * @description - This method runs whenever the redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   */
  static getDerivedStateFromProps(props, state) {
    if (props.success) {
      const { success, loading, article } = props;
      return { success, loading, article };
    }
    if (props.failure) {
      const {
        success, loading, article, failure
      } = props;
      return {
        success, loading, article, failure
      };
    }
    return state;
  }

  /**
   * @description - This method runs whenever the initial component renders
   * @returns {object} state
   * @param {object} props
   */
  componentDidMount() {
    this.props.viewArticle(this.props.match.params.articleslug);
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof ViewArticle
   */
  dummyContent() {
    return (<div className={this.state.failure && 'hide'}>
    <div className="col s12 l6 lighten-5 img-div">
    <div className="dummyPicture"></div>
    </div>
    <div className="col s12 l6 lighten-5">
    <div className="dummyRight"><div></div><div></div><div></div></div>
    </div>
    <div className="col s12 article-body">
    <div className="dummyBody"><div></div><div></div><div></div></div>
    </div>
    </div>);
  }

  /**
   *
   *
   * @param {*} article
   * @returns {jsx} - jsx
   * @memberof ViewArticle
   */
  realContent(article) {
    return (<div>
      <div className="col s12 l6 img-div">
          <img src={article.imgUrl}/>
      </div>
      <div className="col s12 l6">
          <div>
          <h4 className="capitalize">{article.title}</h4>
          <p className="articleDescription">{article.description}</p>
          <Row className="margin-top-10">
              <div className="col s8">
              <Row className="valign-wrapper">
                  <div className="col s4 m3 l4">
                  {
                      !article.User.Profile || !article.User.Profile.profileImage ? <Avatar name={article.User.username} size="75" round={true} />
                        : <img className="profileImage" src={article.User.Profile.profileImage}/>
                  }
                  </div>
                  <div className="col s8 m9 l8">
                  <span className="writer capitalize">{article.User.username}</span><br/>
                  <span className="date-written capitalize">{Moment.duration(article.createdAt, 'hours').humanize() }</span><br/>
                  <span className="readTime">{article.readTime} Minutes Read</span>
                  </div>
              </Row>
              </div>
              <div className="col s4">
              <button
                  className="btn waves-effect waves-light followButton"
                  type="submit"
                  name="action">Follow
              </button>
              </div>
  <div className="fb-share-button" 
    data-href={"https://phlox-ah-staging.herokuapp.com/" + this.props.location.pathname} 
    data-layout="button_count">
  </div>
          </Row>
          <div className="center-align activity-icons">
            <div className="col s2"><i className="fas fa-thumbs-up likeButton liked-unliked"></i> {article.likes.length}</div>
            <div className="col s2"><i className="fas fa-thumbs-down dislikeButton"></i> 3</div>
            <div className="col s1"><i className="fas fa-bookmark bookmarkButton"></i></div>
            <div className="col s1"><i className="fas fa-share-alt shareButton"></i></div>
            {!this.props.user.isAuth && <StarRatings
                    rating={3.03}
                    starDimension="20px"
                    className="col s4"
                    starSpacing="5px"
                  /> }
                  {this.props.user.isAuth && <StarRatings
                    rating={article.ratingAverage}
                    starDimension="20px"
                    starRatedColor="#5e5f63"
                    className="col s4"
                    changeRating={this.addRating}
                    starSpacing="5px"
                    name='rating'
                  />}
              </div>
              <button
                className="btn waves-effect waves-light editButton"
                type="submit"
                name="action">Edit Article
                  </button>
              </div>
          </div>
          <div className="col s12 article-body">
          {
          ReactHtmlParser(article.body)
          }
      </div>
      <div className="col l4 s12 bold tag-div">
          {<a className="red-text"href="#">Report Article</a>}
      </div>
      </div>);
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof ViewArticle
   */
  showContent() {
    if (this.success || this.state.article.User) {
      return this.realContent(this.state.article);
    }
    return this.dummyContent();
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   */
  render() {
    const { failure } = this.state;
    return (
    <div className="MainWrapper2">
        <div className="container">
        <Row className="containerRow">
            <div className="col s12 mainContainer ">
            <Row>
                {
                    failure
                    && <div className="center failure">
                         <h1><i className="fas fa-exclamation-triangle"></i></h1>
                         <h1>404</h1>
                         <h2 className="capitalize">We couldn’t find this page.</h2>
                      </div>
                }
                { this.showContent() }
            </Row>
            </div>
        </Row>
        </div>
    </div>
    );
  }
}

ViewArticle.propTypes = {
  viewArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  failure: PropTypes.bool,
  articles: PropTypes.object,
  match: PropTypes.object,
  articleslug: PropTypes.string,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.article.loading,
  success: state.article.success,
  failure: state.article.failure,
  article: state.article.article,
  user: state.user
});

export default connect(mapStateToProps, { viewArticle, rateArticle })(ViewArticle);
