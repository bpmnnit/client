import React from 'react';
import logo from './logo.png';

class Logo extends React.Component { 
  render() { 
    return ( 
      <img src={logo} alt={'logo'} className='logo'/> 
    );
  }
}

export default Logo;

