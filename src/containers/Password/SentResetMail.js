import React, { Component } from 'react';
import {
  Row, Button
} from 'react-materialize';
import PropTypes from 'prop-types';
import './SentResetMail.scss';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
  forceRefresh: true,
});

/**
 *
 *
 * @class SentResetMail
 * @extends {Component}
 */
class SentResetMail extends Component {
  /**
   *Creates an instance of SentResetMail.
   * @memberof SentResetMail
   */
  constructor() {
    super();
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.goToHome = this.goToHome.bind(this);
  }

  /**
   * @description - This method opens the login modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onLoginClicked() {
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method opens the login modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  goToHome() {
    history.push('/home');
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof SentResetMail
   */
  render() {
    return (
      <div>
        <div className="center sent-reset-mail">
          <div className="signupSuccessCard">
            <i className="fas fa-check-circle fa-5x"></i>
            <h5>Email has been sent!</h5>
            <p>Please follow the instructions in your email to reset your password.</p>
            <Button waves='light' onClick={ this.goToHome }>Go To Home <i className="fas fa-home"></i></Button>
            <Button waves='light' onClick={ this.onLoginClicked }>Go To Login <i className="fas fa-sign-in-alt"></i></Button>
          </div>
        </div>
      </div>
    );
  }
}

SentResetMail.propTypes = {
  history: PropTypes.object
};

export default SentResetMail;
