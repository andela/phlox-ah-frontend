import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div>
    <Link to='/'>Home</Link> | <Link to='/login'>Login</Link> | <Link to="/profile">Profile</Link>
  </div>
);

export default Navbar;
