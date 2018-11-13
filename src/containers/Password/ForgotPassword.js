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
import '../Login/Login.scss';

/**
 *
 *
 * @class ForgotPassword
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

    this.hasError = this.hasError.bind(this);
    this.change = this.change.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof ForgotPassword
   */
  change(e) {
    if (this.props.info.message.length) {
      this.props.clearMsgInfo();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @description - This method prevents the form from reloading the page
   * @returns {func} preventDefault
   * @param {*} e
   * @memberof ForgotPassword
   */
  submit(e) {
    e.preventDefault();
    this.props.sendForgotPassword(this.state.email);
  }

  /**
   * @description - This method closes the forgot password modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  closeModal() {
    this.props.clearMsgInfo();
    $('#forgot-password-modal').modal('close');
  }

  /**
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {bool} error
   * @memberof ForgotPassword
   */
  hasError() {
    if (this.props.info.success) {
      return false;
    }
    return true;
  }

  /**
   * @description - This method opens the login modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  signIn() {
    this.closeModal();
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method opens the signup modal
   * @returns {object} null
   * @memberof ForgotPassword
   */
  signUp() {
    this.closeModal();
    $('#signup-modal').modal('open');
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
          <button className="close-modal"
            onClick={this.closeModal}>
            <i className="fas fa-times fa-lg black-text"></i>
          </button>
        </div>
        <h5 className="form-title">Authors Haven</h5>
        <MsgInfo />
        <form className="col s12" onSubmit={this.submit}>
          <Row>
            <Input
              type="email"
              id="pemail"
              name="email"
              value={this.state.email}
              label="Enter email"
              s={12}
              onChange={this.change}
              hasError={this.hasError()}
            />
            <Button
              type="submit"
              name="Send Email"
            />
          </Row>
        </form>
        <div className="more-action">
          HAVE AN ACCOUNT?
          <button onClick={this.signIn}>
            <span className="theme-color">
              &nbsp; LOGIN
            </span>
          </button>
          <span>&nbsp; |</span>
          <button onClick={this.signUp}>
            <span className="theme-color">
              &nbsp; SIGN UP
            </span>
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.loading,
  info: state.info
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
