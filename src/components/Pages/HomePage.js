import React from 'react';

import '../../styles/style.scss';
import Header from '../../containers/Header/Header';
import Login from '../../containers/Login/Login';
import MsgInfo from '../../containers/MsgInfo/MsgInfo';

const HomePage = () => (
  <div>
    <Header />
    <Login />
    <MsgInfo />
  </div>
);

export default HomePage;
