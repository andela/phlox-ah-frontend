import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import {
  Modal, Row
} from 'react-materialize';
import {
  msgInfoActions, Input, Button
} from '../BasePath';
import '../Common/ModalForm.scss';
import { sendResetPassword } from '../../requests/PasswordRequests';
import MsgInfo from '../MsgInfo/MsgInfo';

const history = createBrowserHistory();

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class ResetPassword extends Component {
  /**
   *Creates an instance of ResetPassword.
   * @memberof ResetPassword
   */
  constructor() {
    super();

    this.state = {
      password: '',
      confirmPassword: '',
      resetPassword: false
    };

    this.hasError = this.hasError.bind(this);
    this.change = this.change.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
    this.submit = this.submit.bind(this);
  }

  /**
   * @description - This method runs after component mounts
   * @returns {object} null
   * @memberof ResetPassword
   */
  componentDidMount() {
    if (/\/password\/reset\/[\w]{20,}/.test(history.location.pathname)) {
      this.setState({ resetPassword: true });
    }
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof ResetPassword
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
   * @memberof ResetPassword
   */
  submit(e) {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (!this.validatePassword(password, confirmPassword)) {
      return;
    }
    const token = encodeURI(history.location.pathname.split('/')[3]);
    this.props.sendResetPassword(token, this.state.password);
  }

  /**
   * @description - This method closes the forgot password modal
   * @returns {object} null
   * @memberof ResetPassword
   */
  closeModal() {
    this.props.clearMsgInfo();
    $('#reset-password-modal').modal('close');
  }

  /**
   * @description - This method checks weather there is input error
   * @returns {bool} error
   * @memberof ResetPassword
   */
  hasError() {
    if (this.props.info.success) {
      return false;
    }
    return true;
  }

  /**
   *
   * @param {*} password
   * @param {*} confirmPassword
   * @param {*} token
   * @memberof ResetPassword
   * @returns {array} response
   */
  validatePassword(password, confirmPassword) {
    let errors = [];
    if (password.length < 8) {
      errors = [...errors, 'password must be at least 8 characters'];
    }

    if (password !== confirmPassword) {
      errors = [...errors, 'passwords do not match'];
    }

    if (errors.length) {
      this.props.setErrorMsgInfo(errors);
      return false;
    }
    return true;
  }

  /**
   * @description - This method opens the login modal
   * @returns {object} null
   * @memberof ResetPassword
   */
  signIn() {
    this.closeModal();
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method opens the signup modal
   * @returns {object} null
   * @memberof ResetPassword
   */
  signUp() {
    this.closeModal();
    $('#signup-modal').modal('open');
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof RedetPassword
   */
  render() {
    const { password, confirmPassword } = this.state;
    return (
      <Modal
        className="center-align modal"
        id="reset-password-modal" open={this.state.resetPassword}>
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
              type="password"
              id="rpassword"
              name="password"
              value={password}
              onChange={this.change}
              label="Password"
              s={12}
              hasError={this.hasError()}
            />
            <Input
              type="password"
              id="rconfirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.change}
              label="Confirm Password"
              s={12}
              hasError={this.hasError()}
            />
            <Button
              type="submit"
              name="Reset Password"
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

ResetPassword.propTypes = {
  sendResetPassword: PropTypes.func,
  loading: PropTypes.bool,
  info: PropTypes.object,
  match: PropTypes.object,
  setErrorMsgInfo: PropTypes.func.isRequired,
  clearMsgInfo: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  sendResetPassword,
  clearMsgInfo: msgInfoActions.clear,
  setErrorMsgInfo: msgInfoActions.failure
})(ResetPassword);
