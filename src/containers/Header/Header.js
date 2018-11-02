import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropDrown from '../../components/DropDown/DropDown';
import "./Header.scss";
import Logo from '../../assets/images/phlox-logo.png';
// import { Dropdown, Button, NavItem } from 'react-materialize';

class Header extends Component {
  /**
   * @member of Header
   */

  constructor(props) {
    super(props);

    this.state = {
      showDropDown: false,
    }

    this.timeoutID = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  clearTimeout() {
    if(this.timeoutID) {
      clearTimeout(this.toggleDropDown);
      this.timeoutID = null;
    }
  }

  onBlur() {
    this.clearTimeout();
    this.timeoutID = setTimeout(this.toggleDropDown.bind(this), 200);
  }

  onLoginClicked() {
    // eslint-disable-next-line
    $("#login-modal").modal("open");
  }

  onShowDropDown() {
    if(!this.state.showDropDown) {
      this.toggleDropDown();
    }
  }

  toggleDropDown() {
    this.setState((state) => ({
      showDropDown: !state.showDropDown,
    }))
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @member of Header
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
                showDropDown && 
                <DropDrown onBlur={this.onBlur.bind(this)} />
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
                href="javascript:void(0)" 
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
