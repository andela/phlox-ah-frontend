import React, { Component } from 'react';
import {
  Modal, Row, Button, Input
} from 'react-materialize';
import '../Login/Login.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendForgotPassword } from '../../requests/PasswordRequests';

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class ForgotPassword extends Component {
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
   * @memberof ForgotPassword
   */
  componentDidUpdate() {
    if (this.props.loading) {
      if (this.props.errorMessage) {
        $('.response-message').text(`${this.props.errorMessage}`);
      } else {
        $('.response-message').text('Cannot connect to server right now!');
      }
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
    $('#forgot-password-modal').modal('close');
  }

  /**
   * @description - This method sends the forgot password request
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onClickForgotPassword() {
    const email = $('#emailText').val();
    this.props.sendForgotPassword(email);
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
   * @memberof ForgetPassword
   */
  render() {
    return (
      <Modal
        id='forgot-password-modal'
        className="center-align">
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
            <Input type="text" id="emailText" label="enter email" s={12} /> <br /> <br />
            <Button
              id="forgot-button" waves='light' onClick={this.onClickForgotPassword.bind(this)}>
              Send Email
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

ForgotPassword.propTypes = {
  sendForgotPassword: PropTypes.func,
  loading: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string
};

export default connect(mapStateToProps, { sendForgotPassword })(ForgotPassword);