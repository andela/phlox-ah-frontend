import React, { Component } from 'react';
import {
  Modal, Row, Col
} from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MsgInfo from '../MsgInfo/MsgInfo';
import {
  login, msgInfoActions, Input, Button
} from '../BasePath';
import { loginConstant } from '../../constants/Constants';
import '../Common/ModalForm.scss';
import './Login.scss';

/**
 *
 *
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
  /**
   * @member of Login
   */

  /**
   * @description - This method runs first in the class
   * @param {object} props
   * @returns {object} articles
   * @memberof Login
   */
  constructor() {
    super();

    this.initialState = {
      emailOrUsername: '',
      password: ''
    };

    this.state = {
      ...this.initialState
    };

    this.hasError = this.hasError.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.change = this.change.bind(this);
    this.signUp = this.signUp.bind(this);
    this.submit = this.submit.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  change(e) {
    if (this.props.info.message.length) {
      this.props.clearMsgInfo();
    }
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
   * @description - This method hides the login modal
   * @returns {object} null
   * @memberof Login
   */
  closeModal() {
    this.props.clearMsgInfo();
    $('#login-modal').modal('close');
  }


  /**
   * @description - This method makes login request
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  submit(e) {
    e.preventDefault();

    if (!this.isValidData(this.state)) {
      return;
    }

    this.props.login(this.state)
      .then((res) => {
        this.setState({ ...this.initialState });
      });
  }

  /**
   * @description - This method runs when forgot password is clicked
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  forgotPassword() {
    this.closeModal();
    $('#forgot-password-modal').modal('open');
  }

  /**
   * @description - This method runs when signup is clicked
   * @returns {object} null
   * @memberof Login
   */
  signUp() {
    this.closeModal();
    $('#signup-modal').modal('open');
  }

  /**
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {bool} error
   * @memberof Login
   */
  hasError() {
    if (this.props.info.success) {
      return false;
    }
    return true;
  }

  /**
   * @description - This method validates the input values
   * @param {objecj} data
   * @returns {array} errors
   * @memberof Login
   */
  isValidData(data) {
    let errors = [];
    if (!data.emailOrUsername) {
      errors = [...errors, 'email or username is required'];
    }
    if (!data.password) {
      errors = [...errors, 'password is required'];
    }

    if (errors.length) {
      this.props.setErrorMsgInfo(errors);
      return false;
    }
    return true;
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Login
   */
  render() {
    const { emailOrUsername, password } = this.state;
    const { loading } = this.props;

    return (
      <Modal
        className="center-align modal" id="login-modal">
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
              type="text"
              label="Email/Username"
              s={12}
              name="emailOrUsername"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={this.change}
              hasError={this.hasError()}
            />
            <Input
              type="password"
              label="Password"
              s={12}
              name="password"
              id="lpassword"
              value={password}
              onChange={this.change}
              hasError={this.hasError()}
            />
            <Row>
              <p s={12}
                className="theme-color forgot-password-link"
                onClick={this.forgotPassword}>
                Forgot password?
              </p>
            </Row>
            <Button
              type="submit"
              waves='light'
              name={loading ? (<i className="fas fa-spinner fa-pulse"></i>) : 'Login'}
            />
            <div className="or-divider">
              <span className="theme-color or">OR</span>
            </div>
            <h6 className="alt-label">SIGN IN USING</h6>
            <Row className="alt-social-auth">
              <Col s={4} >
                <a
                  className="social-auth fb"
                  href={loginConstant.FACEBOOK_LOGIN_URL}>
                  <i className="fab fa-facebook-f"></i>
                </a>
              </Col>
              <Col s={4}>
                <a
                  className="social-auth gp"
                  href={loginConstant.GOOGLE_LOGIN_URL}>
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </Col>
              <Col s={4}>
                <a
                  className="social-auth tw"
                  href={loginConstant.TWITTER_LOGIN_URL}>
                  <i className="fab fa-twitter"></i>
                </a>
              </Col>
            </Row>
          </Row>
        </form>
        <div className="more-action">
          DO NOT HAVE AN ACCOUNT YET?
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  info: PropTypes.object,
  loading: PropTypes.bool,
  logout: PropTypes.func,
  clearMsgInfo: PropTypes.func.isRequired,
  setErrorMsgInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.info,
  loading: state.user.loading,
});

export default connect(mapStateToProps, {
  login,
  clearMsgInfo: msgInfoActions.clear,
  setErrorMsgInfo: msgInfoActions.failure
})(Login);
