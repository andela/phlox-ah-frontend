import React, { Component } from 'react';
import {
  Modal, Row, Button, Col, Input
} from 'react-materialize';
import './Login.scss';
import PropTypes from 'prop-types';

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
   * @description - This method hides the login modal
   * @returns {object} null
   * @memberof Login
   */
  // eslint-disable-next-line
  onCloseClicked() {
    // eslint-disable-next-line
    $("#login-modal").modal("close");
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Login
   */
  render() {
    return (
      <Modal
        id='login-modal'
        className="center-align">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
        <form className="col s12">
          <Row>
            <Input type="text" label="username / email" s={12} />
            <Input type="password" label="password" s={12} />
            <Button
              id="login-button" waves='light'>
              Login
              <i className="fas fa-sign-in-alt"></i>
            </Button>
          </Row>
        </form>
        <h6>Login Using</h6>
        <Row>
          <Col s={4} >
            <a href="#">
              <i className="fab fa-facebook fa-3x"></i>
            </a>
          </Col>
          <Col s={4}>
            <a href="#">
              <i className="fab fa-google-plus-square fa-3x"></i>
            </a>
          </Col>
          <Col s={4}>
            <a href="#">
              <i className="fab fa-twitter-square fa-3x"></i>
            </a>
          </Col>
        </Row>
        <h6>
          No account yet?
          <a href="#">
            <span className="theme-color">
              &nbsp; Sign Up
            </span>
          </a>
        </h6>
      </Modal>
    );
  }
}

Login.propTypes = {
  showLoginForm: PropTypes.func.isRequired,
};

export default Login;
