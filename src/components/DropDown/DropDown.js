import React, { Component } from 'react';
import './DropDown.scss';

class DropDrown extends Component {


  componentDidMount() {
    this.refs.DropDrownWrapper.focus();
  }

  onBlur() {
    this.props.onBlur();
  }

  render() {
    return (
      <div 
        onBlur={this.onBlur.bind(this)}
        tabIndex="1" 
        ref="DropDrownWrapper"
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
    )
  }
}


export default DropDrown;
