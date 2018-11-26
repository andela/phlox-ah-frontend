import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { Row } from 'react-materialize';
import StarRatings from 'react-star-ratings';
import './ViewArticle.scss';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import CommentTextArea from '../../components/CommentTextArea/CommentTextArea';
import CommentButton from '../../components/CommentButton/CommentButton';
import CommentDisplayBox from '../../components/CommentDisplayBox/CommentDisplayBox';
import { createComment, getAllComment } from '../../requests/CommentRequest';
import { bookmarkArticle, allBookmarks, deleteBookmark } from '../../requests/BookmarkRequests';
import ArticleTags from '../../components/Tags/ArticleTags';
import { followUser, unfollowUser, getFollowings } from '../../requests/FollowRequests';
import {
  viewArticle, rateArticle, likeArticle, dislikeArticle
} from '../../requests/ArticleRequests';

/**
 * @class ViewAnArticle
 * @extends {Component}
 */
class ViewArticle extends Component {
  /**
   * @constructor function
   * @param {*} props React properties
   */
  constructor() {
    super();
    this.state = {
      success: false, loading: false, failure: false, article: {}, comment: '', followings: [], user: {}, bookmarks: []
    };

    this.addComment = this.addComment.bind(this);
    this.addRating = this.addRating.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.likeArticle = this.likeArticle.bind(this);
    this.dislikeArticle = this.dislikeArticle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.bookmark = this.bookmark.bind(this);
  }

  // eslint-disable-next-line require-jsdoc
  addRating(newRating, name) {
    this.props.rateArticle(this.props.match.params.articleslug, newRating);
  }

  // eslint-disable-next-line require-jsdoc
  follow() {
    this.props.followUser(this.props.article.User.username);
  }

  // eslint-disable-next-line require-jsdoc
  unfollow() {
    this.props.unfollowUser(this.props.article.User.username);
  }

  /**
   *
   * @returns {func} - bookmark
   * @memberof ViewArticle
   */
  bookmark() {
    const bookmarks = this.state.bookmarks
      .filter(bookmark => bookmark.articleId === this.state.article.id);
    if (bookmarks.length) {
      this.props.deleteBookmark(this.state.article.id);
    } else {
      this.props.bookmarkArticle(this.state.article.id);
    }
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof ViewArticle
   */
  showBookmarkIcon() {
    const bookmarks = this.state.bookmarks
      .filter(bookmark => bookmark.articleId === this.state.article.id);
    if (bookmarks.length) {
      return (<i className="fas fa-bookmark bookmarked bookmarkButton"></i>);
    }
    return (<i className="fas fa-bookmark not-bookmarked bookmarkButton"></i>);
  }

  /**
   * @description - This method likes an article
   * @returns {object} null
   */
  likeArticle() {
    this.props.likeArticle(this.props.match.params.articleslug);
  }

  /**
   * @description - This method likes an article
   * @returns {object} null
   */
  dislikeArticle() {
    this.props.dislikeArticle(this.props.match.params.articleslug);
  }

  /**
   * @description - This method runs whenever the redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   */
  static getDerivedStateFromProps(props, state) {
    return props;
  }

  /**
   * @description - This method runs whenever the initial component renders
   * @returns {object} state
   * @param {object} props
   */
  componentDidMount() {
    this.props.viewArticle(this.props.match.params.articleslug);
    this.props.getFollowings();
    this.props.getAllComment(this.props.match.params.articleslug);
    this.props.allBookmarks();
  }

  /**
   * @description - This method sets the input values
   * @param {object} e
   * @returns {object} void
   * @memberof Comment
   */
  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  /**
    * @description - This method is used to create comment
    * @returns {object} - return payloads
    * @memberof Comment
    */
  addComment() {
    const { comment, article } = this.state;
    this.setState({ comment: '' });
    this.props.createComment(article.slug, comment);
  }

  /**
  * @description - This method displays the login modal
  * @returns {object} null
  * @memberof Header
  */
  signIn() {
    $('#login-modal').modal('open');
  }

  /**
    * @description - This method is used to render comment input for authenticated users
    * @returns {object} - return jsx
    * @memberof Comment
    */
  renderCommentInput() {
    if (this.props.user.isAuth) {
      return (
        <div>
          <CommentTextArea
            handleChange={this.handleChange}
            value={this.state.comment} />
          <CommentButton addComment={this.addComment} />
        </div>);
    }
    return (
      <p>You must logIn to comment on this article. <button className="login-user" onClick={this.signIn}>LogIn</button>
      </p>
    );
  }

  /**
    * @description - This method is used to render list of comments
    * @returns {object} - return jsx
    * @memberof Comment
    */
  renderCommentList() {
    return this.props.comments.map(
      comment => <CommentDisplayBox
        key={comment.id}
        comment={comment}
        />
    );
  }

  /**
   *
   * @returns {jsx} - jsx
   * @memberof ViewArticle
   */
  dummyContent() {
    let className = '';
    if (this.state.failure) {
      className = 'hide';
    }

    return (<div className={className}>
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
    let likeStatus = null;

    // loop through the likes array and filter all instaces where like is equal true
    const likes = article.likes.filter(like => like.like === true);

    // loop through the likes array and filter all instaces where like is equal false
    const dislikes = article.likes.filter(like => like.like === false);

    // check if a user is logged in, then check if he/she has liked or disliked the article
    if (this.state.user.isAuth) {
      const likeArray = article.likes.filter(like => like.userId === this.state.user.id);
      if (likeArray.length > 0) {
        const [like, ...otherArrayItems] = likeArray;
        likeStatus = like.like;
      }
    }
    let likeClassName = 'fas fa-thumbs-up';
    let dislikeClassName = 'fas fa-thumbs-down';

    if (likeStatus) {
      likeClassName = 'active fas fa-thumbs-up';
    }
    if (likeStatus === false) {
      dislikeClassName = 'active fas fa-thumbs-down';
    }
    let articlePic = '';
    if (article.imgUrl === 'null') {
      articlePic = `https://via.placeholder.com/300?text=${article.title.substring(0, 20)}`;
    } else {
      articlePic = article.imgUrl;
    }
    return (<div>
      <div className="col s12 l6 img-div">
          <img src={articlePic}/>
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
                  <span className="date-written capitalize"><small>{Moment.duration(article.createdAt, 'hours').humanize() }</small></span><br/>
                  <span className="readTime"><small>{article.readTime} Minutes Read</small></span>
                  </div>
              </Row>
              </div>
              {this.props.user.username !== article.User.username
              && <div className="col s4">
              {!this.props.followings.find(author => author.username === article.User.username)
                ? <button
                  onClick={this.follow}
                  className="btn waves-effect waves-light followButton"
                  type="submit"
                  name="action">Follow
              </button>
                : <button
                  onClick={this.unfollow}
                  className="btn waves-effect waves-light followButton"
                  type="submit"
                  name="action">Unfollow
              </button>
              }
              </div>
            }
          </Row>
          <div className="center-align activity-icons">
            <div className="col s2"><i className={likeClassName} onClick={this.likeArticle}></i> {likes.length}</div>
            <div className="col s2"><i className={dislikeClassName} onClick={this.dislikeArticle}></i> {dislikes.length}</div>
            {(!this.props.user.isAuth || article.User.username === this.props.user.username) && <div className="col s1"><i className="fas fa-bookmark no-bookmark bookmarkButton"></i></div> }
            {(this.props.user.isAuth && article.User.username !== this.props.user.username) && <div className="col s1" onClick={this.bookmark}>{this.showBookmarkIcon()}</div> }
            <div className="col s1"><i className="fas fa-share-alt shareButton"></i></div>
            {(!this.props.user.isAuth
                  || article.User.username === this.props.user.username) && <StarRatings
                    rating={article.ratingAverage}
                    starDimension="20px"
                    className="col s4"
                    starSpacing="5px"
                  /> }
                  {(this.props.user.isAuth
                  && article.User.username !== this.props.user.username) && <StarRatings
                    rating={article.ratingAverage}
                    starDimension="20px"
                    starRatedColor="#5e5f63"
                    className="col s4"
                    changeRating={this.addRating}
                    starSpacing="5px"
                    name='rating'
                  />}
              </div>
              {(this.props.user.isAuth && article.User.username === this.props.user.username) && <Link className="btn waves-effect waves-light editButton" to={`/articles/${article.slug}/${article.status}/edit`}>Edit Articles</Link> }
              </div>
          </div>
          <div className="col s12 ">
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
            {this.renderCommentInput()}
            {this.renderCommentList()}
          </div>
        </Row>
        </div>
    </div>
    );
  }
}

ViewArticle.propTypes = {
  allBookmarks: PropTypes.func.isRequired,
  bookmarkArticle: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  viewArticle: PropTypes.func.isRequired,
  rateArticle: PropTypes.func.isRequired,
  likeArticle: PropTypes.func.isRequired,
  dislikeArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  article: PropTypes.object,
  articleslug: PropTypes.string,
  comments: PropTypes.array,
  createComment: PropTypes.func,
  getAllComment: PropTypes.func.isRequired,
  failure: PropTypes.bool,
  match: PropTypes.object,
  user: PropTypes.object,
  followUser: PropTypes.func.isRequired,
  unfollowUser: PropTypes.func.isRequired,
  followings: PropTypes.array,
  getFollowings: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  bookmarks: state.bookmark.bookmarks,
  loading: state.article.loading,
  success: state.article.success,
  failure: state.article.failure,
  article: state.article.article,
  comments: state.comments.comment,
  user: state.user,
  followings: state.followUser.followings
});

export default connect(mapStateToProps, {
  viewArticle,
  createComment,
  getAllComment,
  rateArticle,
  followUser,
  getFollowings,
  unfollowUser,
  likeArticle,
  dislikeArticle,
  bookmarkArticle,
  allBookmarks,
  deleteBookmark
})(ViewArticle);
