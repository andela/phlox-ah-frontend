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

    this.onChange = this.onChange.bind(this);
    this.onSignupClicked = this.onSignupClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
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
   * @description - This method hides the login modal
   * @returns {object} null
   * @memberof Login
   */
  onHideModal() {
    $('#login-modal').modal('close');
  }


  /**
   * @description - This method makes login request
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  onSubmit(e) {
    e.preventDefault();
    const errors = this.validateData(this.state);
    if (errors.length) {
      this.props.setErrorMsgInfo(errors);
      return;
    }

    this.props.login(this.state)
      .then((res) => {
        this.setState({
          ...this.initialState
        });
      });
  }

  /**
   * @description - This method runs when forgot password is clicked
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  onForgotPasswordClicked() {
    this.props.clearMsgInfo();
    this.onHideModal();
    $('#forgot-password-modal').modal('open');
  }

  /**
   * @description - This method runs when signup is clicked
   * @returns {object} null
   * @memberof Login
   */
  onSignupClicked() {
    this.onHideModal();
    $('#signupModal').modal('open');
  }

  /**
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {bool} error
   * @memberof Login
   */
  hasError(info = {}) {
    if (info.success) {
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
  validateData(data) {
    let errors = [];
    if (!data.emailOrUsername) {
      errors = [...errors, 'email or username is required'];
    }
    if (!data.password) {
      errors = [...errors, 'password is required'];
    }

    return errors;
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Login
   */
  render() {
    const { emailOrUsername, password } = this.state;

    return (
      <Modal
        className="center-align modal" id="login-modal">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onHideModal}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5 className="form-title">Authors Haven</h5>
        <MsgInfo />
        <form className="col s12" onSubmit={this.onSubmit}>
          <Row>
            <Input
              type="text"
              label="Email/Username"
              s={12}
              name="emailOrUsername"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={this.onChange}
              required={true}
              hasError={this.hasError(this.props.info)}
            />
            <Input
              type="password"
              label="Password"
              s={12}
              name="password"
              id="lpassword"
              value={password}
              onChange={this.onChange}
              required={true}
              hasError={this.hasError(this.props.info)}
            />
            <Row>
              <p s={12}
                className="theme-color forgot-password-link"
                onClick={() => this.onForgotPasswordClicked()}>
                Forgot password?
              </p>
            </Row>
            <Button
              type="submit"
              name="login"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  info: PropTypes.object,
  logout: PropTypes.func,
  clearMsgInfo: PropTypes.func.isRequired,
  setErrorMsgInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  info: state.Info
});

export default connect(mapStateToProps, {
  login,
  clearMsgInfo: msgInfoActions.clear,
  setErrorMsgInfo: msgInfoActions.failure
})(Login);
