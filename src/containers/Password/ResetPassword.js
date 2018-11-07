import React, { Component } from 'react';
import {
  Modal, Row, Button, Input
} from 'react-materialize';
import '../Login/Login.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendResetPassword } from '../../requests/PasswordRequests';

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   * @member of Login
   */

  /**
   * @description - This method hides the login modal
   * @returns {object} null
   * @memberof Login
   */

  /**
   * @description - This method runs when the component upodates
   * @returns {string} response
   * @memberof ResetPassword
   */
  componentDidUpdate() {
    if (this.props.loading) {
      $('.response-message').text(`${this.props.errorMessage}`);
      $('.response-message').removeClass('theme-color');
      $('.response-message').addClass('red-text');
    } else {
      $('.response-message').text(`${this.props.successMessage}`);
      $('.response-message').removeClass('red-text');
      $('.response-message').addClass('theme-color');
    }
    $('.response-message').show();
  }

  /**
   * @description - This method prevents the form from reloading the page
   * @returns {func} preventDefault
   * @param {*} e
   * @memberof ForgotPassword
   */
  onSubmit(e) {
    e.preventDefault();
  }

  /**
   * @description - This method closes the forgot password modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onCloseClicked() {
    $('#reset-password-modal').modal('close');
  }

  /**
   * @description - This method sends the forgot password request
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onClickResetPassword() {
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    const { token } = this.props.match.params;
    if (password.length < 6) {
      $('.response-message').text('Password must be at least 6 characters');
      $('.response-message').addClass('red-text');
      $('.response-message').show();
    } else if (password !== confirmPassword) {
      $('.response-message').text('The passwords do not match');
      $('.response-message').addClass('red-text');
      $('.response-message').show();
    } else if (password === confirmPassword) {
      this.props.sendResetPassword(token, password);
    }
  }

  /**
   * @description - This method opens the login modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onLoginClicked() {
    this.onCloseClicked();
    $('#login-modal').modal('open');
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof RedetPassword
   */
  render() {
    return (
      <Modal
        id='reset-password-modal'
        className="center-align" open={true}>
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
        <p className="theme-color response-message"></p>
        <form className="col s12" onSubmit={this.onSubmit.bind(this)}>
          <Row>
            <Input type="password" id="password" label="Password" s={12} />
            <Input type="password" id="confirmPassword" label="Confirm Password" s={12} />
            <Button
              id="forgot-button" waves='light' onClick={this.onClickResetPassword.bind(this)}>
              Reset Password
            </Button>
          </Row>
        </form>
        <h6>
          Have an account?
          <a href="#" onClick={this.onLoginClicked.bind(this)}>
            <span className="theme-color">
              &nbsp; Log in
            </span>
          </a> |
          <a href="#">
            <span className="theme-color">
              &nbsp; Sign up
            </span>
          </a>
        </h6>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.passwordReducer.loading,
  errorMessage: state.passwordReducer.errorMessage,
  successMessage: state.passwordReducer.successMessage,
});

ResetPassword.propTypes = {
  sendResetPassword: PropTypes.func,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  match: PropTypes.object,
};

export default connect(mapStateToProps, { sendResetPassword })(ResetPassword);
