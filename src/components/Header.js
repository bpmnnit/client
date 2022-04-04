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
        <Link to="/basins" name='basins' className={activeItem === 'basins' ? 'active item' : 'item'} onClick={handleItemClick}>
          Basins
        </Link>
        <Link to="/peoples" name='peoples' className={activeItem === 'peoples' ? 'active item' : 'item'} onClick={handleItemClick}>
          Peoples
        </Link>
        <Link to="/fps" name='fps' className={activeItem === 'fps' ? 'active item' : 'item'} onClick={handleItemClick}>
          FP
        </Link>
        <Link to="/surveys" name='surveys' className={activeItem === 'surveys' ? 'active item' : 'item'} onClick={handleItemClick}>
          Surveys
        </Link>
        <Link to="/dprs" name='dprs' className={activeItem === 'dprs' ? 'active item' : 'item'} onClick={handleItemClick}>
          DPR
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
          <Logo />
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

  