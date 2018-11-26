import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import './Settings.scss';
import { getUserNotificationStatus, optInForNotification, optOutFromNotification } from '../../requests/NotificationRequests';

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

    this.state = { notificationStatus: false };
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * @description - This method get runs before the component mount
   * @returns {object} void
   * @memberof Settings
   */
  componentDidMount() {
    this.props.getUserNotificationStatus(this.props.user.username);
  }

  /**
   * @description - This method sets the input values
   * @param {object} checked
   * @param {object} event
   * @param {object} id
   * @returns {object} void
   * @memberof Settings
   */
  handleChange(checked, event, id) {
    this.setState({ [id]: checked });
    if (checked) {
      this.props.optInForNotification();
    } else {
      this.props.optOutFromNotification();
    }
  }

  /**
  * @description - This method runs whenever the redux state changes
  * @returns {object} state
  * @param {object} props
  * @param {object} state
  */
  static getDerivedStateFromProps(props, state) {
    if (props.notification.success) {
      const { emailNotification } = props.notification;
      return { notificationStatus: emailNotification };
    }
    return state;
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
          <h4 className="subtitle">Turn On All Notifications</h4>
          <div className="notification-content">
            <p className="description">We’ll email you when there are notifications
                on your stories and publications, and when you have new followers.</p>
            <div className="button">
              <Switch
                onChange={this.handleChange}
                checked={this.state.notificationStatus}
                onColor="#3B8CA1"
                height={30}
                id="notificationStatus"
              />
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  getUserNotificationStatus: PropTypes.func.isRequired,
  notification: PropTypes.object,
  optInForNotification: PropTypes.func,
  optOutFromNotification: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

export default connect(mapStateToProps, {
  getUserNotificationStatus,
  optInForNotification,
  optOutFromNotification
})(Settings);
