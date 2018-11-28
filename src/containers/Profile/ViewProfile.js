/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewProfile } from '../../requests/ProfileRequest';
import FollowList from '../../components/FollowList/FollowList';
import Tags from '../../components/Tags/Tags';
import AuthorsArticle from '../AuthorsArticle/AuthorsArticle';

import './ViewProfile.scss';
import './Profile.scss';

/**
 * @class ViewProfile
 * @extends {Component}
 */
class ViewProfile extends Component {
  /**
   * @description - This method runs when component mount
   * @returns {object} null
   * @memberof Header
   */
  componentDidMount() {
    if (!this.props.profile.firstName) {
      this.props.viewProfile();
    }
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof ViewProfile
   */
  render() {
    const followers = ['James Author', 'Chris Daughtry', 'Luke Bryan', 'Sam Hunt', 'Elie Goulding'];
    const tags = ['Religion', 'Sports', 'Technology', 'Music', 'Art', 'Software', 'Finance'];

    const listOfFollowers = (
      followers.map((follower, i) => <FollowList key={i}>{follower}</FollowList>));
    const tagList = tags.map((tag, i) => <Tags key={i}>{tag}</Tags>);

    return (
      <div className="profile">
        <div className="profile-wrapper">
          <div className="profile-info tablet">
            <div className="info-wrapper">
              <div className="pi-photo">
                <div className="profile-image">
                  {
                    this.props.profile.profileImage ? <img src={this.props.profile.profileImage} alt="Profile Image" className="circle responsive-img"/>
                      : <Avatar name={this.props.user.username} size="75" round={true} />
                  }
                </div>
              </div>
              <div className="pi-detail">
                <div className="username">
                  {`${this.props.profile.lastName} ${this.props.profile.firstName}`}
                </div>
                <table className="profile-data">
                  <tbody>
                    <tr className="data-row">
                      <td>Email: </td>
                      <td>{this.props.user.email}</td>
                    </tr>
                    <tr className="data-row">
                      <td>Bio: </td>
                      <td>
                        {this.props.profile.bio}
                      </td>
                    </tr>
                    <tr className="data-row">
                      <td>Contact: </td>
                      <td>
                        {this.props.profile.contact}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="followers">
              <div className="follow">
                <span className="header">
                  Authors I Follow
                </span>
                <ul className="authors">
                  {listOfFollowers}
                </ul>
                <div className="more">
                  <Link to="#">View more</Link>
                </div>
              </div>
              {/* end of follow */}
              <div className="following">
                <span className="header">
                  Authors Following Me
                </span>
                <ul className="authors">
                  {listOfFollowers}
                </ul>
                <div className="more">
                <Link to="#">View more</Link>
                </div>
              </div>
              {/* end of following */}
            </div>
            {/* end of followers */}

            <AuthorsArticle {...this.props} />

          </div>
          {/* end of profile info */}
          <div className="profile-edit">
            <div className="edit-profile-link">
              <Link to='/profile/edit'>Edit Profile</Link>
            </div>
            <div className="pref-heading">
              My Article Preferences
            </div>
            <div className="tags">
              <ul className="tags-wrapper">
                {tagList}
              </ul>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

ViewProfile.propTypes = {
  viewProfile: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gender: PropTypes.string,
  bio: PropTypes.string,
  contact: PropTypes.string,
  profileImage: PropTypes.string,
  profile: PropTypes.object,
  user: PropTypes.object
};

export default connect(mapStateToProps, {
  viewProfile
})(ViewProfile);
