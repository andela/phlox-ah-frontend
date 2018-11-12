import React, { Component } from 'react';
import {
  Modal, Row, Button, Input
} from 'react-materialize';
import '../Login/Login.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendResetPassword } from '../../requests/PasswordRequests';
import { msgInfoActions } from '../BasePath';

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   *Creates an instance of ForgotPassword.
   * @memberof ResetPassword
   */
  constructor() {
    super();
    this.onClickResetPassword = this.onClickResetPassword.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    this.validatePassword(password, confirmPassword, token);
  }

  /**
   *
   *
   * @param {*} password
   * @param {*} confirmPassword
   * @param {*} token
   * @memberof ResetPassword
   * @returns {array} response
   */
  validatePassword(password, confirmPassword, token) {
    if (password.length < 6 && password !== confirmPassword) {
      this.props.displayErrorMsg(['Password must be at least 6 characters', 'The passwords do not match']);
    } else if (password.length < 6) {
      this.props.displayErrorMsg(['Password must be at least 6 characters']);
    } else if (password !== confirmPassword) {
      this.props.displayErrorMsg(['The passwords do not match']);
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
        className="center-align reset-password-modal" id="reset-password-modal" open={true}>
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
        <form className="col s12" onSubmit={this.onSubmit}>
          <Row>
            <Input type="password" id="password" label="Password" s={12} />
            <Input type="password" id="confirmPassword" label="Confirm Password" s={12} />
            <Button
              className="reset-button" waves='light' onClick={this.onClickResetPassword}>
              Reset Password
            </Button>
          </Row>
        </form>
        <h6>
          Have an account?
          <a href="#" onClick={this.onLoginClicked}>
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
  loading: state.loading
});

ResetPassword.propTypes = {
  sendResetPassword: PropTypes.func,
  loading: PropTypes.bool,
  match: PropTypes.object,
  displayErrorMsg: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, {
  sendResetPassword, displayErrorMsg: msgInfoActions.failure
})(ResetPassword);
