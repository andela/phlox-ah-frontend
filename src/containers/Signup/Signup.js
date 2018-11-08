import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Modal, Input, Row, Col
} from 'react-materialize';
import './Signup.scss';
import { connect } from 'react-redux';
import { signup } from '../../requests/SignupRequests';

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
  constructor(props) {
    super(props);
    this.state = { email: '', username: '', password: '' };
    this.onChange = this.onChange.bind(this);
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
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Signup
   */
  render() {
    const { email, username, password } = this.state;
    const { loading, success } = this.props;
    return (
    <Modal id='signupModal' className="center-align">
      {
        success
        && <div id="signupSuccessCard">
          <i className="fas fa-check-circle fa-5x"></i>
          <h5>Registration was successful</h5>
          <p>To proceed, Please check your email and verify your account</p>
          <Button waves='light' onClick={this.closeModal}> OK</Button>
        </div>
      }
      {
      !success
      && <div>
        <div>
          <a href="#" onClick={this.closeModal}>
            <i className="fas fa-times right fa-lg black-text"></i>
          </a>
        </div>
        <h5>Authors Haven.</h5>
        <form className="col s12" onSubmit={this.submit}>
          <Row>
            <Input
              type="text"
              label="username"
              s={12}
              name="username"
              value={username}
              onChange={this.onChange}
              required
            />
            <Input
              type="email"
              label="email"
              s={12}
              name="email"
              value={email}
              onChange={this.onChange}
              required
            />
            <Input
              type="password"
              label="password"
              s={12}
              name="password"
              value={password}
              onChange={this.onChange}
              required
            />
            <Button typr="submit" id="signupButton" waves='light'>Sign Up  {!loading && <i className="fas fa-sign-in-alt"></i>} {loading && <i className="fas fa-spinner fa-pulse"></i>}</Button>
          </Row>
        </form>
        <h6>Sign Up Using</h6>
        <Row>
          <Col s={4} ><a href="#"><i className="fab fa-facebook fa-3x"></i></a></Col>
          <Col s={4}><a href="#"><i className="fab fa-google-plus-square fa-3x"></i></a></Col>
          <Col s={4}><a href="#"><i className="fab fa-twitter-square fa-3x"></i></a></Col>
        </Row>
        <h6>Already Have An Account? <a href="#"><span className="theme-color">Login</span></a></h6>
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
