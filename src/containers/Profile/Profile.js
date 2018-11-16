import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import PropTypes from 'prop-types';
import {
  Button, Input, Row, Col
} from 'react-materialize';
import { newProfile, viewProfile } from '../../requests/ProfileRequest';
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
      contact: '',
      profileImage: '',
      dataImage: ''
    };

    this.handleFileInputChange = this.handleFileInputChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} profile
   * @memberof Profile
   */
  componentDidMount() {
    if (!this.props.profile.firstName) {
      this.props.viewProfile()
        .then(({ profile }) => this.updateState(profile));
    } else {
      this.updateState(this.props.profile);
    }
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} null
   * @param {object} data
   * @memberof Profile
   */
  updateState(data = {}) {
    this.setState({ ...data });
  }

  /**
   * @description - This method runs on input change
   * @param {object} e
   * @return {object} state
   * @memberof Profile
   */
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  /**
   * @description - This method sets profile image
   * @param {object} e
   * @return {string} file url
   * @memberof Profile
   */
  handleFileInputChange(e) {
    const file = e.target.files[0];
    if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      this.setState({
        profileImage: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        this.setState({
          dataImage: dataURL
        });
      };
      reader.readAsDataURL(file);
    }
  }


  /**
   * @description - This method handles the submit
   * @param {object} e
   * @return {object} new profile details
   * @memberof Profile
   */
  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(this.state).forEach((key) => {
      formData.append(key, this.state[key]);
    });
    this.props.newProfile(formData, this.props);
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
            <Col s={12}>
              <div className="profile-image">
                {
                  this.state.dataImage || this.props.profile.profileImage ? <img src={this.state.dataImage || this.props.profile.profileImage} alt="Profile Image" className="circle responsive-img"/>
                    : <Avatar name={this.props.user.username} size="75" round={true} />
                }
              </div>
            </Col>
            <Col s={12}><label htmlFor="profile-image" className="profile-image">Change</label></Col>
            <input type="file" onChange={this.handleFileInputChange} hidden id="profile-image" name="profileImage"/>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Input s={12} l={6} placeholder="First Name" label="Firstname" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} />
              <Input s={12} l={6} placeholder="Last Name" label="Lastname" name="lastName" onChange={this.handleInputChange} value={this.state.lastName}/>
              <Input s={12} l={6} placeholder="Contact" label="Contact" name="contact" onChange={this.handleInputChange} value={this.state.contact}/>
              {/* <option value="" disabled selected>Choose gender</option> */}
              <div className="col input-field s12 l6" value={this.state.gender} onChange={this.handleInputChange}>
                <select className="browser-default s6" >
                  <option value="" disabled selected>Choose gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <Input s={12} type='textarea' rows="4" placeholder="Bio" label="Bio" name="bio" onChange={this.handleInputChange} value={this.state.bio}/>
              <Col s={12}>
              <Button s={12} l={6}className="updateButton" waves='light'>Update Profile  <i className="fas fa-edit"></i></Button>
              </Col>
            </Row>
          </form>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});

Profile.propTypes = {
  newProfile: PropTypes.func,
  viewProfile: PropTypes.func,
  profile: PropTypes.object,
  user: PropTypes.object
};

export default connect(mapStateToProps, {
  newProfile,
  viewProfile
})(Profile);
