import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row, Col, Card, CardTitle, Button
} from 'react-materialize';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import './Followings.scss';
import Sidebar from '../Sidebar/Sidebar';
import {
  getFollowings, getFollowers, followUser, unfollowUser
} from '../../requests/FollowRequests';
import FollowList from '../../components/FollowList/FollowList';


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
      failure: false,
      followers: [],
      followings: [],
      success: false
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
    return props;
  }

  /**
    *
    * @returns {func} article
    * @memberof Home
    */
  componentDidMount() {
    this.props.getFollowings();
    this.props.getFollowers();
  }


  /**
   *
   *
   * @returns {jsx} - jsx
   * @memberof Home
   */
  followers() {
    if (this.state.failure) {
      return (<div className="preloaderDiv"></div>);
    }
    return this.listFollowings(this.state.followers);
  }


  /**
   *
  * @param {*} followers
   * @returns {jsx} - jsx
   * @memberof Home
   */
  listFollowings(followers) {
    return followers.map((follower, i) => (<Col s={12} m={12}
      l={12} xl={6} key={follower.id}>
      <Card >
      <FollowList
      key={i}>{follower.Profile && follower.Profile.profileImage ? <img src={follower.Profile.profileImage} alt="Profile Image" className="circle responsive-img follow-pic"/>
        : <Avatar name={follower.username} size="50" round={true} />}{follower.username}</FollowList><Button className="followAuthor">unfollow</Button>
    </Card>
      </Col>));
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
                      <h6><b>Authors that follow you</b></h6>
                    </div>
                  </Col>
                </Row>
                <Row>
                  { this.followers() }
                </Row>
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
  followings: state.followUser.followings,
  followers: state.followUser.followers,
  success: state.article.success,
});

Home.propTypes = {
  failure: PropTypes.bool,
  getFollowers: PropTypes.func,
  getFollowings: PropTypes.func,
  success: PropTypes.bool
};

export default connect(mapStateToProps, {
  getFollowers, getFollowings, followUser, unfollowUser
})(Home);
