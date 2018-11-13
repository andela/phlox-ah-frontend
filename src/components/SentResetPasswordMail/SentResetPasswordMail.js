import React, { Component } from 'react';
import {
  Row, Button
} from 'react-materialize';
import PropTypes from 'prop-types';
import './SentResetPasswordMail.scss';

const onLogin = () => {
  $('#login-modal').modal('open');
};

const goToHome = (props) => {
  props.history.push('/', null);
};

export const SentResetPasswordMail = props => (
  <div>
    <div className="center sent-reset-mail">
      <div className="signupSuccessCard">
        <i className="fas fa-check-circle fa-5x"></i>
        <h5>Email has been sent!</h5>
        <p>Please follow the instructions sent to your email to reset your password.</p>
      <Button waves='light' onClick={() => goToHome(props) }>
        Go To Home
        <i className="fas fa-home"></i>
      </Button>
    <Button waves='light' onClick={ () => onLogin() }>
        Go To Login
        <i className="fas fa-sign-in-alt"></i>
      </Button>
    </div>
  </div>
</div>
);

SentResetPasswordMail.propTypes = {
  history: PropTypes.object
};

export default SentResetPasswordMail;
