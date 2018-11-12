import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Modal, Row
} from 'react-materialize';
import {
  msgInfoActions, Input, Button
} from '../BasePath';
import '../Common/ModalForm.scss';
import { sendResetPassword } from '../../requests/PasswordRequests';
import MsgInfo from '../MsgInfo/MsgInfo';

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

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  /**
   * @description - This method runs after component mounts
   * @returns {object} null
   * @memberof ResetPassword
   */
  componentDidMount() {
    if (/\/password\/reset\/\w+/.test(this.props.match.url)) {
      this.setState({
        resetPassword: true
      });
    }
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof ResetPassword
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
   * @memberof ResetPassword
   */
  onSubmit(e) {
    e.preventDefault();
    const { password, confirmPassword } = this.state;
    if (!this.validatePassword(password, confirmPassword)) {
      return;
    }
    const { token } = this.props.match.params;
    this.props.sendResetPassword(token, this.state.password, this.props);
  }

  /**
   * @description - This method closes the forgot password modal
   * @returns {object} null
   * @memberof ResetPassword
   */
  onClose() {
    this.props.clearMsgInfo();
    $('#reset-password-modal').modal('close');
  }

  /**
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {bool} error
   * @memberof ResetPassword
   */
  hasError(info = {}) {
    if (info.success) {
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
    if (password.length < 6) {
      errors = [...errors, 'password must be at least 6 characters'];
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
  onSignIn() {
    this.onClose();
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method opens the signup modal
   * @returns {object} null
   * @memberof ResetPassword
   */
  onSignUp() {
    this.onClose();
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
            onClick={this.onClose}>
            <i className="fas fa-times fa-lg black-text"></i>
          </button>
        </div>
        <h5 className="form-title">Authors Haven</h5>
        <MsgInfo />
        <form className="col s12" onSubmit={this.onSubmit}>
          <Row>
            <Input
              type="password"
              id="rpassword"
              name="password"
              value={password}
              onChange={this.onChange}
              label="Password"
              s={12}
              required={true}
              hasError={this.hasError(this.props.info)}
            />
            <Input
              type="password"
              id="rconfirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              label="Confirm Password"
              s={12}
              required={true}
              hasError={this.hasError(this.props.info)}
            />
            <Button
              type="submit"
              name="Reset Password"
            />
          </Row>
        </form>
        <div className="more-action">
          HAVE AN ACCOUNT?
          <button onClick={this.onSignIn}>
            <span className="theme-color">
              &nbsp; LOGIN
            </span>
          </button>
          <span>&nbsp; |</span>
          <button onClick={this.onSignUp}>
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
