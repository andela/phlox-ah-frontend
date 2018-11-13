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
      showDropDown: false,
      showMobileDropDown: false,
      showSettingsOption: false,
      isAuth: false,
    };
    this.logout = this.logout.bind(this);
    this.onMobileBlur = this.onMobileBlur.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onShowDropDown = this.onShowDropDown.bind(this);
    this.onShowMobileDropDown = this.onShowMobileDropDown.bind(this);
    this.timeoutID = null;
    this.timeoutMobileID = null;
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleMobileDropDown = this.toggleMobileDropDown.bind(this);
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
    this.clearMobileTimeout();
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
   * @description - This method clears timeout for mobile device
   * @returns {object} null
   * @memberof Header
   */
  clearMobileTimeout() {
    if (this.timeoutMobileID) {
      clearTimeout(this.timeoutMobileID);
      this.timeoutMobileID = null;
    }
  }

  /**
   * @description - This method is trigger by unblur event
   * @returns {object} null
   * @memberof Header
   */
  onBlur() {
    this.clearTimeout();
    this.timeoutID = setTimeout(this.toggleDropDown, 200);
  }


  /**
   * @description - This method is trigger by unblur event for mobile device
   * @returns {object} null
   * @memberof Header
   */
  onMobileBlur() {
    this.clearMobileTimeout();
    this.timeoutID = setTimeout(this.toggleMobileDropDown, 200);
  }

  /**
   * @description - This method displays the signup modal
   * @returns {object} null
   * @memberof Header
   */
  onSignupClicked() {
    $('#signupModal').modal('open');
  }

  /**
   * @description - This method displays the login modal
   * @returns {object} null
   * @memberof Header
   */
  onLoginClicked() {
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method logs the user out of the application
   * @returns {object} null
   * @memberof Header
   */
  logout() {
    this.props.logout();
    localStorage.removeItem('token');
  }

  /**
   * @description - This method displays the categories dropdown
   * @returns {object} null
   * @memberof Header
   */
  onShowDropDown() {
    if (!this.state.showDropDown) {
      this.toggleDropDown();
    }
  }

  /**
   * @description - This method displays the categories dropdown for mobile device
   * @returns {object} null
   * @memberof Header
   */
  onShowMobileDropDown() {
    if (!this.state.showMobileDropDown) {
      this.toggleMobileDropDown();
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
   * @description - This method toggles the categories dropdown for mobile device
   * @returns {object} null
   * @memberof Header
   */
  toggleMobileDropDown() {
    this.setState({
      showMobileDropDown: !this.state.showMobileDropDown,
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
      showDropDown,
      showMobileDropDown,
      showSettingsOption,
      isAuth
    } = this.state;

    return (
      <nav className="main-header">
      <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        <div className="nav-wrapper">
          <div className="brand">
            <a href="#" className="brand-logo">
              <img src={Logo} alt="" />
            </a>
            <span className="brand-name hide-on-med-and-down">Authors Haven</span>
          </div>
          <div className="search-wrapper hide-on-med-and-down">
            <div className="categories">
              <span onClick={this.onShowDropDown}>
                <i className="fas fa-th"></i>
                <i className="fas fa-sort-down"></i>
              </span>
              {
                showDropDown
                && <DropDown onBlur={this.onBlur} />
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
              className="right nav-button">
              <li>
                <a
                  onClick={this.onLoginClicked}
                  href="#"
                  className="login">
                  Login
                </a>
              </li>
              <li>
                <a
                  onClick={this.onSignupClicked}
                  href="#" className="sign-up">
                  Sign Up
                </a>
              </li>
            </ul>
          }
          {
            isAuth
            && <ul
              className="right nav-button">
              <li>
                <a className="notification-bell hide-on-med-and-down" href="#">
                  <i className="fas fa-bell"></i>
                </a>
              </li>
              <li
                onClick={this.toggleSettingsOptions}
                id="settings-dropdown">
                <span className="user-photo"><i className="fas fa-user user"></i></span>
                {
                  showSettingsOption
                    && <div className="sd-wrapper hide-on-med-and-down">
                      <ul>
                      <li
                          className="s-list">
                          <Link to="/profile">
                            <i className="fas fa-user"></i>
                            &nbsp; Profile
                          </Link>
                        </li>
                        <li
                          onClick={this.logout}
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
        <ul className="sidenav" id="mobile-nav">
        <a href="#">
          <img src={Logo} alt="" className="side-logo" />
        </a>
        <div className="search-wrapper">
            <div className="input">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
            <div className="categories">
              <span className="btn white" onClick={this.onShowMobileDropDown}>
                Categories
              <i className="fas fa-sort-down"></i>
              </span>
              {
                showMobileDropDown
                && <DropDown onBlur={this.onMobileBlur} />
              }
            </div>
          </div>
          {
            !isAuth
            && <ul>
             <li>
              <a
                onClick={this.onLoginClicked}
                href="#"
                className="login">
                Login
              </a>
            </li>
            <li>
              <a href="#" className="sign-up">Sign Up</a>
            </li>
            </ul>
            }
            {
            isAuth
            && <ul>
             <li>
                <a href="#">
                  <i className="fas fa-bell"></i>Notifications
                </a>
              </li>
              <li
                className="s-list">
                <Link to="/profile">
                  <i className="fas fa-sign-out-alt"></i>
                  &nbsp; Profile
                </Link>
              </li>
              <li
                onClick={this.logout}>
                <a href="">
                <i className="fas fa-sign-out-alt"></i>
                &nbsp; Sign out
                </a>
              </li>
            </ul>
            }
        </ul>
      </nav>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.User
});


export default connect(mapStateToProps, {
  logout: asyncActions(LOGOUT).success
})(Header);
