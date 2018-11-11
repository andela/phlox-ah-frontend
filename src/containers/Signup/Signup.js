import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Row, Col
} from 'react-materialize';
import '../Common/ModalForm.scss';
import './Signup.scss';
import { connect } from 'react-redux';
import { signup } from '../../requests/SignupRequests';
import {
  Input, Button
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
      email: '', username: '', password: '', confirmPassword: ''
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
  }

  /**
   * @memberOf handle close modal
   * @method closeModal
   * @param {*} event
   * @return {*} boolean
   */
  closeModal() {
    $('#signupModal').modal('close');
  }

  /**
   * @memberOf handleChangeEvent
   * @method handleChangeEvent
   * @param {*} event
   * @return {*} setstate
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  /**
   * @description - This method makes signup request
   * @param {objecj} event
   * @returns {object} null
   * @memberof Signup
   */
  submit(event) {
    event.preventDefault();
    this.props.signup(this.state);
  }


  /**
   * @description - This method runs when signup is clicked
   * @returns {object} null
   * @memberof Login
   */
  onLoginClicked() {
    this.closeModal();
    $('#login-modal').modal('open');
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Signup
   */
  render() {
    const {
      email, username, password, confirmPassword
    } = this.state;
    const { loading, success } = this.props;
    return (
      <Modal id='signupModal' className="center-align modal">
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
              onClick={this.closeModal}
              name="OK"
            />
          </div>
        }
        {
          !success
          && <div>
            <div>
              <a
                className="close-modal"
                href="#" onClick={this.closeModal}>
                <i className="fas fa-times fa-lg black-text"></i>
              </a>
            </div>
            <h5 className="form-title">Authors Haven</h5>
            <form className="col s12" onSubmit={this.submit}>
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
                />
                <Button
                  type="submit"
                  className="signupButton"
                  waves='light'
                  name={loading
                    ? (<i className="fas fa-spinner fa-pulse"></i>)
                    : 'Sign Up'}
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
              <a href="#" onClick={this.onLoginClicked}>
                <span className="theme-color">
                  &nbsp; LOGIN
                </span>
              </a>
            </div>
          </div>
        }
      </Modal>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
};

const mapStateToProps = state => ({
  loading: state.Signup.loading,
  success: state.Signup.success,
});

export default connect(mapStateToProps, { signup })(Signup);
