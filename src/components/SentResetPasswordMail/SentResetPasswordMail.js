import React, { Component } from 'react';
import {
  Row, Button
} from 'react-materialize';
import PropTypes from 'prop-types';
import './SentResetPasswordMail.scss';

const login = () => {
  $('#login-modal').modal('open');
};

const goToHome = (props) => {
  props.history.push('/');
};

export const SentResetPasswordMail = props => (
  <div>
    <div className="center sent-reset-mail">
      <div className="signupSuccessCard">
        <i className="fas fa-check-circle fa-5x"></i>
        <h5>Email has been sent!</h5>
        <p>Please follow the instructions sent to your email to reset your password.</p>
      <Button waves='light' onClick={() => goToHome(props) }>
        Go To Home &nbsp;
        <i className="fas fa-home"></i>
      </Button>
    <Button waves='light' onClick={ () => login() }>
        Go To Login &nbsp;
        <i className="fas fa-sign-in-alt"></i>
      </Button>
    </div>
  </div>
</div>
);

SentResetPasswordMail.propTypes = {
  props: PropTypes.object
};

export default SentResetPasswordMail;
