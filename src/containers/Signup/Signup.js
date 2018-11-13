import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Row, Col
} from 'react-materialize';
import '../Common/ModalForm.scss';
import './Signup.scss';
import { connect } from 'react-redux';
import MsgInfo from '../MsgInfo/MsgInfo';
import {
  signup, msgInfoActions, Input, Button, asyncActions, SIGNUP
} from '../BasePath';

/**
 *
 *
 * @class Signup
 * @extends {Component}
 */
class Signup extends Component {
  /**
   * @constructor function
   * @param {*} props React properties
   */
  constructor() {
    super();
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  /**
   * @memberOf handle close modal
   * @method onClose
   * @param {*} event
   * @return {*} boolean
   */
  onClose() {
    $('#signup-modal').modal('close');
    this.props.setSignUpSuccessState(false);
    this.props.clearMsgInfo();
  }

  /**
   * @description - This method checks weather there is input error
   * @param {objecj} info
   * @returns {object} error
   */
  hasError() {
    const errors = {
      validEmail: true,
      validUsername: true,
      validPassword: true,
    };

    const { info } = this.props;

    info.message.forEach((value) => {
      if (!info.success && value.includes('password')) {
        errors.validPassword = false;
      }
      if (!info.success && value.includes('email')) {
        errors.validEmail = false;
      }
      if (!info.success && value.includes('username')) {
        errors.validUsername = false;
      }
    });

    return errors;
  }

  /**
   * @memberOf handleChangeEvent
   * @method handleChangeEvent
   * @param {*} e
   * @return {*} setstate
   */
  onChange(e) {
    if (this.props.info.message.length) {
      this.props.clearMsgInfo();
    }
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /**
   * @description - This method makes signup request
   * @param {objecj} e
   * @returns {object} null
   * @memberof Signup
   */
  onSubmit(e) {
    e.preventDefault();

    if (!this.isValidData(this.state)) {
      return;
    }

    this.props.signup(this.state);
  }

  /**
   * @description - This method runs when signup is clicked
   * @returns {object} null
   * @memberof Login
   */
  onSignIn() {
    this.onClose();
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method validates the input values
   * @param {objecj} data
   * @returns {array} errors
   * @memberof Login
   */
  isValidData(data) {
    let errors = [];
    if (!data.username) {
      errors = [...errors, 'username is required'];
    }
    if (!data.email) {
      errors = [...errors, 'email is required'];
    }
    if (!data.password) {
      errors = [...errors, 'password is required'];
    }
    if (data.password !== data.confirmPassword) {
      errors = [...errors, 'passwords do not match'];
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
   * @memberof Signup
   */
  render() {
    const {
      email,
      username,
      password,
      confirmPassword,
    } = this.state;

    const { loading, success } = this.props;

    return (
      <Modal id='signup-modal' className="center-align modal">
        {
          success
          && <div className="signupSuccessCard">
            <i className="fas fa-check-circle fa-5x"></i>
            <h5>Registration was successful</h5>
            <p>
              To proceed, Please check your email and verify your account
            </p>
            <Button
              waves='light'
              onClick={this.onClose}
              name="OK"
            />
          </div>
        }
        {
          !success
          && <div>
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
                  type="text"
                  label="Username"
                  s={12}
                  name="username"
                  id="username"
                  value={username}
                  onChange={this.onChange}
                  required={true}
                  hasError={!this.hasError().validUsername}
                />
                <Input
                  type="email"
                  label="Email"
                  s={12}
                  name="email"
                  id="email"
                  value={email}
                  onChange={this.onChange}
                  required={true}
                  hasError={!this.hasError().validEmail}
                />
                <Input
                  type="password"
                  label="Password"
                  s={12}
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.onChange}
                  required={true}
                  hasError={!this.hasError().validPassword}
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  s={12}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={this.onChange}
                  required={true}
                  hasError={!this.hasError().validPassword}
                />
                <Button
                  type="submit"
                  className="signupButton"
                  waves='light'
                  name={loading ? (<i className="fas fa-spinner fa-pulse"></i>) : 'Sign Up'}
                />
              </Row>
            </form>
            <div className="or-divider">
              <span className="theme-color or">OR</span>
            </div>
            <h6 className="alt-label">SIGN UP USING</h6>
            <Row>
              <Col s={4} >
                <a
                  className="social-auth fb" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </Col>
              <Col s={4}>
                <a className="social-auth gp "href="#">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </Col>
              <Col s={4}>
                <a className="social-auth tw" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </Col>
            </Row>
            <div className="more-action">
              ALREADY HAVE AN ACCOUNT?
              <button onClick={this.onSignIn}>
                <span className="theme-color">
                  &nbsp; LOGIN
                </span>
              </button>
            </div>
          </div>
        }
      </Modal>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  setSignUpSuccessState: PropTypes.func.isRequired,
  clearMsgInfo: PropTypes.func.isRequired,
  setErrorMsgInfo: PropTypes.func.isRequired,
  info: PropTypes.object,
  loading: PropTypes.bool,
  success: PropTypes.bool
};

const mapStateToProps = state => ({
  loading: state.signup.loading,
  success: state.signup.success,
  info: state.info
});

export default connect(mapStateToProps, {
  signup,
  setErrorMsgInfo: msgInfoActions.failure,
  clearMsgInfo: msgInfoActions.clear,
  setSignUpSuccessState: asyncActions(SIGNUP).success
})(Signup);
