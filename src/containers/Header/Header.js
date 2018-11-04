import React, { Component } from 'react';
// eslint disable next line
// import { connect } from 'react-redux';
import DropDrown from '../../components/DropDown/DropDown';
import './Header.scss';
import Logo from '../../assets/images/phlox-logo.png';
// import { Dropdown, Button, NavItem } from 'react-materialize';

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
  constructor(props) {
    super(props);

    this.state = {
      showDropDown: false,
    };

    this.timeoutID = null;
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
      clearTimeout(this.toggleDropDown);
      this.timeoutID = null;
    }
  }

  /**
   * @description - This method is trigger by unblur event
   * @returns {object} null
   * @memberof Header
   */
  onBlur() {
    this.clearTimeout();
    this.timeoutID = setTimeout(this.toggleDropDown.bind(this), 200);
  }

  /**
   * @description - This method displays the login modal
   * @returns {object} null
   * @memberof Header
   */
  // eslint-disable-next-line
  onLoginClicked() {
  // eslint-disable-next-line
    $('#login-modal').modal('open');
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
   * @description - This method toggles the categories dropdown
   * @returns {object} null
   * @memberof Header
   */
  toggleDropDown() {
    this.setState(state => ({
      showDropDown: !state.showDropDown,
    }));
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof Header
   */
  render() {
    const { showDropDown } = this.state;

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
              <span onClick={this.onShowDropDown.bind(this)}>
                <i className="fas fa-th"></i>
                <i className="fas fa-sort-down"></i>
              </span>
              {
                showDropDown
                && <DropDrown onBlur={this.onBlur.bind(this)} />
              }
            </div>
            <div className="input">
              <input type="text" placeholder="Search" />
              <i className="fas fa-search"></i>
            </div>
          </div>
          <ul id="nav-button"
            className="right hide-on-med-and-down">
            <li>
              <a
                onClick={this.onLoginClicked.bind(this)}
                href="#"
                className="login">
                Login
              </a>
            </li>
            <li><a href="#" className="sign-up">Sign Up</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}


// export default connect(mapStateToProps, { addArticle, getArticles })(Header);
export default Header;
