import React, { Component } from 'react';
import {
  Modal, Row
} from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  msgInfoActions, Input, Button
} from '../BasePath';
import MsgInfo from '../MsgInfo/MsgInfo';
import '../Common/ModalForm.scss';
import { sendForgotPassword } from '../../requests/PasswordRequests';

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class ForgotPassword extends Component {
  /**
   *Creates an instance of ForgotPassword.
   * @memberof ForgotPassword
   */
  constructor() {
    super();

    this.state = {
      email: ''
    };

    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onSignupClicked = this.onSignupClicked.bind(this);
    this.onCloseClicked = this.onCloseClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onChange(e) {
    if (this.props.info.message.length) {
      this.props.clearMsgInfo();
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - This method prevents the form from reloading the page
   * @returns {func} preventDefault
   * @param {*} e
   * @memberof ForgotPassword
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.sendForgotPassword(this.state.emai);
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
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {bool} error
   * @memberof ForgotPassword
   */
  hasError(info = {}) {
    if (info.success) {
      return false;
    }
    return true;
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
   * @description - This method opens the signup modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  onSignupClicked() {
    this.onCloseClicked();
    $('#signupModal').modal('open');
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
        className="center-align modal"
        id="forgot-password-modal">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5 className="form-title">Authors Haven</h5>
        <MsgInfo />
        <form className="col s12" onSubmit={this.onSubmit}>
          <Row>
            <Input
              type="email"
              id="femail"
              name="email"
              value={this.state.email}
              label="Enter email"
              s={12}
              required={true}
              onChange={this.onChange}
              hasError={this.hasError(this.props.info)}
            />
            <Button
              type="submit"
              name="Send Email"
            />
          </Row>
        </form>
        <div className="more-action">
          HAVE AN ACCOUNT?
          <a href="#" onClick={this.onLoginClicked}>
            <span className="theme-color">
              &nbsp; LOGIN
            </span>
          </a>
          <span>&nbsp; |</span>
          <a href="#" onClick={this.onSignupClicked}>
            <span className="theme-color">
              &nbsp; SIGN UP
            </span>
          </a>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  info: state.Info
});

ForgotPassword.propTypes = {
  sendForgotPassword: PropTypes.func,
  loading: PropTypes.bool,
  info: PropTypes.object,
  clearMsgInfo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  sendForgotPassword,
  clearMsgInfo: msgInfoActions.clear
})(ForgotPassword);
