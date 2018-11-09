import React, { Component } from 'react';
import {
  Modal, Row, Button, Col, Input
} from 'react-materialize';
import './Login.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, msgInfoActions } from '../BasePath';
import { loginConstant } from '../../constants/Constants';

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

    this.state = {
      emailOrUsername: '',
      password: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  /**
   * @description - This method sets the input values
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  onChange(e) {
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
    $('.login-modal').modal('close');
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
      this.props.displayErrorMsg(errors);
      return;
    }

    this.props.login(this.state)
      .then((response) => {
        this.setState({
          emailOrUsername: '',
          password: ''
        });
      });
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
   * @description - This runs when forgot password is clicked
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  onForgotPasswordClicked() {
    this.onHideModal();
    $('.forgot-password-modal').modal('open');
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
        className="center-align login-modal">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onHideModal}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
      <form id="test" className="col s12" onSubmit={e => this.onSubmit(e)}>
        <Row>
          <Input
            type="text"
            label="username / email"
            s={12}
            name="emailOrUsername"
            value={emailOrUsername}
            onChange={this.onChange}
          />
          <Input
            type="password"
            label="password"
            s={12}
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <Button
            type="submit"
            className="login-button" waves='light'>
            Login
            <i className="fas fa-sign-in-alt"></i>
          </Button>
          <h6>Login Using</h6>
          <Col s={4} >
            <a href={loginConstant.FACEBOOK_LOGIN_URL}>
              <i className="fab fa-facebook fa-3x"></i>
            </a>
          </Col>
          <Col s={4}>
            <a href={loginConstant.GOOGLE_LOGIN_URL}>
              <i className="fab fa-google-plus-square fa-3x"></i>
            </a>
          </Col>
          <Col s={4}>
            <a href={loginConstant.TWITTER_LOGIN_URL}>
              <i className="fab fa-twitter-square fa-3x"></i>
            </a>
          </Col>
        </Row>
      </form>
      <h6>
        No account yet?
        <a href="#">
          <span className="theme-color">
            &nbsp; Sign Up
          </span>
        </a>
      </h6>
      <p className="theme-color forgot-password-link" onClick={() => this.onForgotPasswordClicked()}>Forgot password?</p>
    </Modal>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  logout: PropTypes.func,
  displayErrorMsg: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.User
});

export default connect(mapStateToProps, {
  login,
  displayErrorMsg: msgInfoActions.failure
})(Login);
