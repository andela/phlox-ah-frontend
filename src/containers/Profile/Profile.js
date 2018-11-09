import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Icon, Input, Row, Col
} from 'react-materialize';
import { newProfile } from '../../requests/ProfileRequest';
import './Profile.scss';

/**
 *
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * @description - This method runs first in the class
   * @returns {object} profile
   * @memberof Profile
   */
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      bio: '',
      contact: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * @description - This method runs after component has been mounted
   * @param {object} e
   * @return {object} props
   * @memberof ViewProfile
   */
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - This method runs after component has been mounted
   * @param {object} e
   * @return {object} props
   * @memberof ViewProfile
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.newProfile(this.state);
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Home
 */
  render() {
    return (
      <div className="container">
        <Row>
          <Col s={8} m={6} offset='s2 m3' className='grid-example formCol'>
          <h5>Edit My Profile</h5>
          <Row>
            <Col s={12}> <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg" alt="Profile Image" className="circle responsive-img"/></Col>
            <Col s={12}><a href="#">Change</a></Col>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Input s={12} l={6} placeholder="Firstname" label="Firstname" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} />
              <Input s={12} l={6} placeholder="Lastname" label="Lastname" name="lastName" onChange={this.handleInputChange} value={this.state.lastName}/>
              <Input s={12} l={6} placeholder="Contact" label="Contact" name="contact" onChange={this.handleInputChange} value={this.state.contact}/>
              <Input s={12} l={6} type='select' label="Gender" name="gender" onChange={this.handleInputChange} value={this.state.gender}>
                <option disable>Select </option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </Input>
              <Input s={12} type='textarea' rows="4" placeholder="Bio" label="Bio" name="bio" onChange={this.handleInputChange} value={this.state.bio}/>
              <Button s={12} l={6}className="updateButton" waves='light'>Update Profile  <i className="fas fa-edit"></i></Button>
            </Row>
          </form>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.Profile,
});

Profile.propTypes = {
  newProfile: PropTypes.func,
};

export default connect(mapStateToProps, {
  newProfile
})(Profile);
