import React, { Component } from 'react';
import {
  Modal, Row, Button, Col, Input
} from 'react-materialize';
import './Login.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from './BasePath';
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
  constructor(props) {
    super(props);

    this.state = {
      emailOrUsername: '',
      password: '',
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
      [e.target.name]: e.target.value,
    });
  }

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
   * @description - This method makes login request
   * @param {objecj} e
   * @returns {object} null
   * @memberof Login
   */
  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
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
        id='login-modal'
        className="center-align">
        <div>
          <a className="close-modal" href="#"
            onClick={this.onCloseClicked}>
            <i className="fas fa-times fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven</h5>
        <form id="test" className="col s12" onSubmit={this.onSubmit.bind(this)}>
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
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
