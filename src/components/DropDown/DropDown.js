import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DropDown.scss';

/**
 *
 *
 * @class DropDown
 * @extends {Component}
 */
class DropDrown extends Component {
  /**
   * @description - This method runs first in the class
   * @param {props} props
   * @memberof DropDrown
   */
  constructor(props) {
    super(props);
    this.dropDrownWrapper = React.createRef();
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @memberofDropDrown
   */
  componentDidMount() {
    this.DropDrownWrapper.current.focus();
  }

  /**
   *
   * @description - This method listen to onblur event
   *  @returns {object} null
   *  @memberof DropDrown
   */
  onBlur() {
    this.props.onBlur();
  }

  /**
   *
   * @description - This method renders the jsx for this component
   * @returns {jsx} - jsx
   * @memberof DropDrown
   */
  render() {
    return (
      <div
        onBlur={this.onBlur.bind(this)}
        tabIndex="1"
        ref={this.dropDrownWrapper}
        className="dropdown-wrapper">
        <ul className="l-wing">
          <li><a href="#">Religion</a></li>
          <li><a href="#">Arts</a></li>
          <li><a href="#">Technology</a></li>
          <li><a href="#">Animals</a></li>
          <li><a href="#">Culture</a></li>
          <li><a href="#">Finance</a></li>
        </ul>
        <ul className="r-wing">
          <li><a href="#">Sport</a></li>
          <li><a href="#">Medicine</a></li>
          <li><a href="#">Gadget</a></li>
          <li><a href="#">Programming</a></li>
          <li><a href="#">History</a></li>
          <li><a href="#">Fashion</a></li>
        </ul>
      </div>
    );
  }
}

DropDrown.propTypes = {
  onBlur: PropTypes.func.isRequired,
};

export default DropDrown;
