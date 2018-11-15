import PropTypes from 'prop-types';
import React from 'react';
import './VerificationStatus.scss';
import { Button } from 'react-materialize';


const VerificationStatus = props => (
    <div>
      <i className={props.iconClass}></i>
      <h3>{props.message}</h3>
      <Button onClick={props.onClick} className="home-button" waves='light'><i className="fas fa-arrow-left"></i>  <span>BACK TO HOME</span></Button>
    </div>
);

VerificationStatus.propTypes = {
  message: PropTypes.string,
  iconClass: PropTypes.string,
  onClick: PropTypes.func
};
export default VerificationStatus;
