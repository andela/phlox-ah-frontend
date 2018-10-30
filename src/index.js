import React from 'react';
import { render } from 'react-dom';
import './styles/style.scss';

const Index = () => (
    <div>
      <h1 className="theme-color">Hello! Welcome to Authors Haven</h1>
    </div>
);
render(<Index/>, document.getElementById('root'));
