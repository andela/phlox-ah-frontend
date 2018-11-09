/* eslint-disable no-script-url */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewProfile } from '../../requests/ProfileRequest';

import './ViewProfile.scss';

/**
 * @class ViewProfile
 * @extends {Component}
 */
class ViewProfile extends Component {
  /**
   * @description - This method runs first in the class
   * @returns {object} articles
   * @memberof ViewProfile
   */
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      bio: '',
      contact: '',
      profileImage: ''
    };
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @memberof ViewProfile
   */
  componentDidMount() {
    this.props.viewProfile();
  }

  /**
   * @description - This method runs after component has been mounted
   * @param {object} props
   * @return {object} props
   * @memberof ViewProfile
   */
  static getDerivedStateFromProps(props) {
    return {
      ...props.profile
    };
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof ViewProfile
   */
  render() {
    return (
      <div className="profile">
        <div className="profile-wrapper">
          <div className="profile-info tablet">
            <div className="info-wrapper">
              <div className="pi-photo">
                <span className="photo"></span>

              </div>
              <div className="pi-detail">
                <div className="username">
                  {`${this.state.lastName} ${this.state.firstName}`}
                </div>
                <table className="profile-data">
                  <tbody>
                    <tr className="data-row">
                      <td>Email: </td>
                      <td>me@email.com</td>
                    </tr>
                    <tr className="data-row">
                      <td>Bio: </td>
                      <td>
                        {this.state.bio}
                      </td>
                    </tr>
                    <tr className="data-row">
                      <td>Contact: </td>
                      <td>
                        {this.state.contact}
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
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="more">
                  <a href="javascript:void">View more</a>
                </div>
              </div>
              {/* end of follow */}
              <div className="following">
                <span className="header">
                  Authors Following Me
                </span>
                <ul className="authors">
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                  <li className="author">
                    <a href="javascript:void">
                      <div className="photo"></div>
                      <div className="name">
                        Solomon Odumah
                      </div>
                    </a>
                  </li>
                </ul>
                <div className="more">
                  <a href="javascript:void">View more</a>
                </div>
              </div>
              {/* end of following */}
            </div>
            {/* end of followers */}
          </div>
          {/* end of profile info */}
          <div className="profile-edit">
            <div className="edit-profile-link">
              <Link to='/edit_profile'>Edit Profile</Link>
            </div>
            <div className="pref-heading">
              My Article Preferences
            </div>
            <div className="tags">
              <ul className="tags-wrapper">
                <li className="tag">
                  <span className="tag-name">
                    Religion
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Sports
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Technology
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Music
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Arts
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Software
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
                <li className="tag">
                  <span className="tag-name">
                    Finance
                  </span>
                  <span className="remove-tag">
                    <i className="fas fa-times"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.Profile,
});

ViewProfile.propTypes = {
  viewProfile: PropTypes.func,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gender: PropTypes.string,
  bio: PropTypes.string,
  contact: PropTypes.string,
  profileImage: PropTypes.string,
};

export default connect(mapStateToProps, {
  viewProfile
})(ViewProfile);
