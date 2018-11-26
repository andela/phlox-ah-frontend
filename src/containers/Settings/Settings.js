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

    this.state = { checked: false };
    this.toggleButton = this.toggleButton.bind(this);
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
   * @param {boolean} checked
   * @returns {object} void
   * @memberof Settings
   */
  toggleButton(checked) {
    this.setState({ checked });
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
      return { checked: props.notification.emailNotification };
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
                onChange={this.toggleButton}
                checked={this.state.checked}
                onColor="#3B8CA1"
                height={30}
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
