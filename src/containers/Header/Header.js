import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import DropDown from '../../components/DropDown/DropDown';
import Logo from '../../assets/images/phlox-logo.png';
import { viewProfile } from '../../requests/ProfileRequest';
import {
  msgInfoActions, asyncActions, LOGOUT, SIGNUP
} from '../BasePath';
import './Header.scss';

const history = createBrowserHistory({ forceRefresh: true });

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
      showMobileDropDown: false,
      showDropDown: false,
      showSettingsOption: false
    };

    this.blur = this.blur.bind(this);
    this.onMobileBlur = this.onMobileBlur.bind(this);
    this.showDropDown = this.showDropDown.bind(this);
    this.showMobileDropDown = this.showMobileDropDown.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.signUp = this.signUp.bind(this);
    this.timeoutID = null;
    this.timeoutMobileID = null;
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleMobileDropDown = this.toggleMobileDropDown.bind(this);
    this.toggleSettingsOptions = this.toggleSettingsOptions.bind(this);
  }

  /**
   * @description - This method runs when component mount
   * @returns {object} null
   * @memberof Header
   */
  componentDidMount() {
    if (!this.props.profile.firstName) {
      this.props.viewProfile();
    }
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
  blur() {
    this.clearTimeout();
    this.timeoutID = setTimeout(this.toggleDropDown.bind(this), 200);
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
   * @description - This method displays the login modal
   * @returns {object} null
   * @memberof Header
   */
  signIn() {
    this.props.clearMsgInfo();
    $('#login-modal').modal('open');
  }

  /**
   * @description - This method logs the user out of the application
   * @returns {object} null
   * @memberof Header
   */
  signOut() {
    this.props.signOut();
    this.props.clearMsgInfo();
    localStorage.removeItem('token');
    history.push('/');
  }

  /**
   * @description - This method displays the signup modal
   * @returns {object} null
   * @memberof Header
   */
  signUp() {
    this.props.clearMsgInfo();
    this.props.setSignUpSuccessState(false);
    $('#signup-modal').modal('open');
  }

  /**
   * @description - This method displays the categories dropdown for mobile device
   * @returns {object} null
   * @memberof Header
   */
  showMobileDropDown() {
    if (!this.state.showMobileDropDown) {
      this.toggleMobileDropDown();
    }
  }

  /**
   * @description - This method displays the settings dropdown
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
        <div className="nav-wrapper">
          <div className="brand">
            <a href="#" className="brand-logo">
              <img src={Logo} alt="" />
            </a>
            <span className="brand-name hide-on-med-and-down"><Link to="/" >Authors Haven</Link></span>
          </div>
          <div className="search-wrapper">
            <div className="categories hide-on-med-and-down">
              <span onClick={this.showDropDown}>
                <i className="fas fa-th"></i>
                <i className="fas fa-sort-down"></i>
              </span>
              {
                showDropDown
                && <DropDown blur={this.blur} />
              }
            </div>
            <div className="input hide-on-med-and-down">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
          </div>
          {
            !isAuth
            && <ul
              className="right nav-button">
              <li>
                <button
                  onClick={this.signIn}
                  className="login">
                  Login
                </button>
              </li>
              <li>
                <button
                  onClick={this.signUp}
                  className="sign-up">
                  Sign Up
                </button>
              </li>
            </ul>
          }
          {
            isAuth
            && <ul
              className="right nav-button">
              <li>
                <Link to="/articles" className="notification-bell hide-on-med-and-down">
                  <i className="fas fa-plus-square"></i>
                </Link>
              </li>
              <li>
                <a className="notification-bell hide-on-med-and-down">
                  <i className="fas fa-bell"></i>
                </a>
              </li>
              <li
                onClick={this.toggleSettingsOptions}
                id="settings-dropdown">
                <a className="user-photo"></a>
                {
                  showSettingsOption
                    && <div className="sd-wrapper">
                      <ul>
                      <li
                        className="s-list">
                        <Link to="/settings">
                          <i className="fas fa-cog"></i>
                          &nbsp; Settings
                          </Link>
                      </li>
                      <li
                          className="s-list">
                          <Link to="/profile">
                            <i className="fas fa-user"></i>
                            &nbsp; Profile
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
  profile: PropTypes.shape({
    firstName: PropTypes.string
  }),
  viewProfile: PropTypes.func,
  clearMsgInfo: PropTypes.func,
  setSignUpSuccessState: PropTypes.func.isRequired,
  signOut: PropTypes.func
};

const mapStateToProps = state => ({
  profile: state.profile,
  user: state.user
});


export default connect(mapStateToProps, {
  viewProfile,
  signOut: asyncActions(LOGOUT).success,
  setSignUpSuccessState: asyncActions(SIGNUP).success,
  clearMsgInfo: msgInfoActions.clear
})(Header);
