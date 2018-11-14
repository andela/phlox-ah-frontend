import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DropDown from '../../components/DropDown/DropDown';
import './Header.scss';
import Logo from '../../assets/images/phlox-logo.png';
import { asyncActions, LOGOUT } from './BasePath';

/**
 *
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  /**
   * @member of Header
   */

  /**
   * @description - This method runs first in the class
   * @returns {object} null
   * @param {object} props
   * @memberof Header
   */
  constructor() {
    super();

    this.state = {
      isAuth: false,
      showDropDown: false,
      showSettingsOption: false
    };
    this.blur = this.blur.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signUp = this.signUp.bind(this);
    this.timeoutID = null;
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSettingsOptions = this.toggleSettingsOptions.bind(this);
  }

  /**
   * @description - This method runs whenever redux state changes
   * @returns {object} state
   * @param {object} props
   * @param {object} state
   * @memberof Header
   */
  static getDerivedStateFromProps(props, state) {
    return props.user;
  }

  /**
   * @description - This method runs after component will unmount
   * @returns {object} null
   * @memberof Header
   */
  componentWillUnmount() {
    this.clearTimeout();
  }

  /**
   * @description - This method clears timeout
   * @returns {object} null
   * @memberof Header
   */
  clearTimeout() {
    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
      this.timeoutID = null;
    }
  }

  /**
   * @description - This method is trigger by unblur event
   * @returns {object} null
   * @memberof Header
   */
  blur() {
    this.clearTimeout();
    this.timeoutID = setTimeout(this.toggleDropDown, 200);
  }

  /**
   * @description - This method displays the signup modal
   * @returns {object} null
   * @memberof Header
   */
  signUp() {
    $('#signupModal').modal('open');
  }

  /**
   * @description - This method displays the login modal
   * @returns {object} null
   * @memberof Header
   */
  signIn() {
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method logs the user out of the application
   * @returns {object} null
   * @memberof Header
   */
  signOut() {
    this.props.signOut();
    localStorage.removeItem('token');
  }

  /**
   * @description - This method displays the categories dropdown
   * @returns {object} null
   * @memberof Header
   */
  showDropDown() {
    if (!this.state.showDropDown) {
      this.toggleDropDown();
    }
  }

  /**
   * @description - This method displays the settings dropdown
   * @returns {object} null
   * @memberof Header
   */
  toggleSettingsOptions() {
    this.setState({
      showSettingsOption: !this.state.showSettingsOption,
    });
  }

  /**
   * @description - This method toggles the categories dropdown
   * @returns {object} null
   * @memberof Header
   */
  toggleDropDown() {
    this.setState({
      showDropDown: !this.state.showDropDown,
    });
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Header
   */
  render() {
    const {
      isAuth,
      showDropDown,
      showSettingsOption
    } = this.state;

    return (
      <nav className="main-header">
        <div className="nav-wrapper">
          <div className="brand">
            <a href="#" className="brand-logo">
              <img src={Logo} alt="" />
            </a>
            <span className="brand-name">Authors Haven</span>
          </div>
          <div className="search-wrapper">
            <div className="categories">
              <span onClick={this.showDropDown}>
                <i className="fas fa-th"></i>
                <i className="fas fa-sort-down"></i>
              </span>
              {
                showDropDown
                && <DropDown blur={this.blur} />
              }
            </div>
            <div className="input">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
          </div>
          {
            !isAuth
            && <ul
              className="right hide-on-med-and-down nav-button">
              <li>
                <a
                  onClick={this.signIn}
                  href="#"
                  className="login">
                  Login
                </a>
              </li>
              <li>
                <a
                  onClick={this.signUp}
                  href="#" className="sign-up">
                  Sign Up
                </a>
              </li>
            </ul>
          }
          {
            isAuth
            && <ul
              className="right hide-on-med-and-down nav-button">
              <li>
                <a className="notification-bell" href="#">
                  <i className="fas fa-bell"></i>
                </a>
              </li>
              <li
                onClick={this.toggleSettingsOptions}
                id="settings-dropdown">
                <span className="user-photo" ></span>
                {
                  showSettingsOption
                  && <div className="sd-wrapper">
                    <ul>
                      <li className="s-list">
                        <Link to="/articles">
                          <i className="fas fa-plus"></i>
                          &nbsp;New Article
                        </Link>
                      </li>
                      <li
                        onClick={this.signOut}
                        className="s-list">
                        <i className="fas fa-sign-out-alt"></i>
                        &nbsp; Sign out
                        </li>
                    </ul>
                  </div>
                }
              </li>
            </ul>
          }
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user
});


export default connect(mapStateToProps, {
  signOut: asyncActions(LOGOUT).success
})(Header);
