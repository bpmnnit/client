import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './logo/Logo';

const Header = (props) => {
  const currentUser = props.currentUser;
  const [activeItem, setActiveItem] = useState('');
  
  const handleItemClick = (e) => {
    setActiveItem(e.currentTarget.getAttribute('name'));   
  }
  
  if (currentUser) {
    return (
      <div className='ui pointing menu'>
        <Link to="/" className="item">
          <Logo />
        </Link> 
        <Link to="/regions" name='regions' className={activeItem === 'regions' ? 'active item' : 'item'} onClick={handleItemClick}>
          Regions
        </Link>
        <div className='right menu'>
          <Link to="/profile" name='profile' className={activeItem === 'profile' ? 'active item' : 'item'} onClick={handleItemClick}>
            Profile
          </Link>
          <Link to="/login" className="item" onClick={props.logOut}>
            Logout
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className='ui pointing menu'>
        <Link to="/" className="item">
          <img src='images/logo.png' alt='Logo' />
        </Link>
        <div className='right menu'>
          <Link to="/login" name='login' className={activeItem === 'login' ? 'active item' : 'item'} onClick={handleItemClick}>
            Log In
          </Link>
          <Link to="/register" name='signup' className={activeItem === 'signup' ? 'active item' : 'item'} onClick={handleItemClick}>
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
};

export default Header;

  