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
    $('.forgot-password-modal').modal('close');
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
    $('.login-modal').modal('open');
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
        className="center-align forgot-password-modal">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
        <form className="col s12" onSubmit={e => this.onSubmit(e)}>
          <Row>
            <Input type="text" id="emailText" label="enter email" s={12} /> <br /> <br />
            <Button
              className="forgot-button" waves='light' onClick={() => this.onClickForgotPassword()}>
              Send Email
            </Button>
          </Row>
        </form>
        <h6>
          Have an account?
          <a href="#" onClick={() => this.onLoginClicked()}>
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
  loading: state.loading,
});

ForgotPassword.propTypes = {
  sendForgotPassword: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(mapStateToProps, {
  sendForgotPassword
})(ForgotPassword);
