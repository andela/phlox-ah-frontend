import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { viewProfile } from '../../requests/ProfileRequest';

/**
 *
 *
 * @class Home
 * @extends {Component}
 */
class ViewProfile extends Component {
  /**
   * @returns {array} article
   * @memberof Home
   */

  /**
   * @description - This method runs first in the class
   * @returns {object} articles
   * @memberof Home
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
   * @memberof Home
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
   * @memberof Home
   */
  render() {
    return (
      <div>
        <h1>Profile</h1>
        <ul>
          <li>firstName: {this.state.firstName}</li>
          <li>lastName: {this.state.lastName}</li>
          <li>gender: {this.state.gender}</li>
          <li>bio: {this.state.bio}</li>
          <li>contact: {this.state.contact}</li>
          <li>profileImage: {this.state.profileImage}</li>
        </ul>
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
