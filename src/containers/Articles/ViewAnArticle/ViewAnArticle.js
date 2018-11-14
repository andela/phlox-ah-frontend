import React, { Component } from 'react';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import Moment from 'moment';
import { Row } from 'react-materialize';
import './ViewAnArticle.scss';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import ArticleTags from '../../../components/Tags/ArticleTags';
import { viewArticle } from '../../../requests/ArticleRequests';

/**
 * @class ViewAnArticle
 * @extends {Component}
 */
class ViewAnArticle extends Component {
  /**
   * @constructor function
   * @param {*} props React properties
   */
  constructor() {
    super();
    this.state = { success: false, loading: false, article: [] };
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
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   */
  render() {
    const { success, article } = this.state;
    return (
    <div className="MainWrapper2">
        <div className="container">
        <Row className="containerRow">
            <div className="col s12 mainContainer ">
            <Row>
                {/* DUMMY DIV */}
                { !success
                  ? <div>
                <div className="col s12 l6 lighten-5 img-div">
                <div className="dummyPicture"></div>
                </div>
                <div className="col s12 l6 lighten-5">
                <div className="dummyRight"><div></div><div></div><div></div></div>
                </div>
                <div className="col s12 article-body">
                <div className="dummyBody"><div></div><div></div><div></div></div>
                </div>
                </div>
                //   REAL DIV
                  : <div>
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
                                    article.User.Profile.profileImage ? <img className="profileImage" src={article.User.Profile.profileImage}/>
                                      : <Avatar name={article.User.username} size="75" round={true} />
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
                        </Row>
                        <div className="center-align activity-icons">
                            <div className="col s3"><i className="fas fa-thumbs-up likeButton liked-unliked"></i> {article.likes.length}</div>
                            <div className="col s3"><i className="fas fa-thumbs-down dislikeButton"></i> 97</div>
                            <div className="col s3"><i className="fas fa-bookmark bookmarkButton"></i></div>
                            <div className="col s3"><i className="fas fa-share-alt shareButton"></i></div>
                        </div>
                        </div>
                    </div>
                    <div className="col s12 article-body">
                        {
                        ReactHtmlParser(article.body)
                        }
                    </div>
                    <ArticleTags tags={success ? article.Tags : ['']} />
                    <div className="col l4 s12 bold tag-div">
                        {<a className="red-text"href="#">Report Article</a>}
                    </div>
                    </div>
                }
            </Row>
            </div>
        </Row>
        </div>
    </div>
    );
  }
}

ViewAnArticle.propTypes = {
  viewArticle: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  articles: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.Articles.loading,
  success: state.Articles.success,
  article: state.Articles.article,
});

export default connect(mapStateToProps, { viewArticle })(ViewAnArticle);
