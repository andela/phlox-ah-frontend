import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';

import './Settings.scss';

/**
 * @class Settings
 * @extends {Component}
 */
class Settings extends Component {
  /**
   * @description - This method runs first in the class
   * @returns {object} Settings
   * @memberof Settings
   */
  constructor() {
    super();

    this.state = {
      articleNotify: true,
      followerNotify: false,
      socialNotify: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {object} checked
   * @param {object} event
   * @param {object} id
   * @returns {object} void
   * @memberof Comment
   */
  handleChange(checked, event, id) {
    this.setState({ [id]: checked });
  }

  /**
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Settings
   */
  render() {
    return (
      <div className="settings">
        <header className="title">
          <h2>Settings</h2>
        </header>
        <div className="notification">
          <h4 className="subtitle">Notifications on your article</h4>
          <div className="notification-content">
            <p className="description">We’ll email you when there are notifications
                on your stories and publications.</p>
            <div className="button">
              <Switch
                onChange={this.handleChange}
                checked={this.state.articleNotify}
                id="articleNotify"
              />
            </div>
          </div>
          <hr />
        </div>
        <div>
          <h4 className="subtitle">Followers Notification</h4>
          <div className="notification-content">
            <p className="description">We’ll email you when you have new followers</p>
            <div className="button">
              <Switch
                onChange={this.handleChange}
                checked={this.state.followerNotify}
                id="followerNotify"
              />
            </div>
          </div>
          <hr />
        </div>
        <div className="social-link">
          <h4 className="subtitle">Show links to Facebook and Twitter on your profile page</h4>
          <div className="notification-content">
            <p className="description">Your profile will include links to your Facebook and Twitter
                pages if those accounts are connected to your account.</p>
            <div className="button">
              <Switch
                onChange={this.handleChange}
                checked={this.state.socialNotify}
                id="socialNotify"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Settings);
