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
  constructor() {
    super();
    this.dropDrownWrapper = React.createRef();
  }

  /**
   * @description - This method runs after component has been mounted
   * @returns {object} articles
   * @memberof DropDrown
   */
  componentDidMount() {
    this.dropDrownWrapper.current.focus();
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
        onBlur={this.props.blur}
        tabIndex="1"
        ref={this.dropDrownWrapper}
        className="dropdown-wrapper">
        <ul className="l-wing">
          <li className="dropdown-list"><a href="#">Religion</a></li>
          <li className="dropdown-list"><a href="#">Arts</a></li>
          <li className="dropdown-list"><a href="#">Technology</a></li>
          <li className="dropdown-list"><a href="#">Animals</a></li>
          <li className="dropdown-list"><a href="#">Culture</a></li>
          <li className="dropdown-list"><a href="#">Finance</a></li>
        </ul>
        <ul className="r-wing">
          <li className="dropdown-list"><a href="#">Sport</a></li>
          <li className="dropdown-list"><a href="#">Medicine</a></li>
          <li className="dropdown-list"><a href="#">Gadget</a></li>
          <li className="dropdown-list"><a href="#">Programming</a></li>
          <li className="dropdown-list"><a href="#">History</a></li>
          <li className="dropdown-list"><a href="#">Fashion</a></li>
        </ul>
      </div>
    );
  }
}

DropDrown.propTypes = {
  blur: PropTypes.func.isRequired,
};

export default DropDrown;
