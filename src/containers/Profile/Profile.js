import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Input, Button } from 'react-materialize';
import ViewProfile from './ViewProfile';
import { newProfile } from '../../requests/ProfileRequest';

/**
 *
 *
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
  /**
   * @returns {array} Profile
   * @memberof Home
   */

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
      <div>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Input s={8} label="Firstname" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} />
              <Input s={8} label="lastname" name="lastName" onChange={this.handleInputChange} value={this.state.lastName} />
              <Input s={8} label="Gender" name="gender" onChange={this.handleInputChange} value={this.state.gender}/>
              <Input s={8} label="Bio" name="bio" onChange={this.handleInputChange} value={this.state.bio}/>
              <Input type="text" label="Contact" s={8} name="contact" onChange={this.handleInputChange} value={this.state.contact}/>
              <div className="col input-field s8">
                <Button waves='light' name="submit" node='button'> Edit Profile</Button>
              </div>
            </Row>
          </form>
          <hr />
          <ViewProfile />
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
