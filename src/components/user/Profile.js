import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="user-profile-wrapper">
        <div className='ui centered raised card'>
          <div className='image'>
            <img src={'images/elliot.jpg'} alt='User Logo'/>
          </div>
          <div className='content'>
            <div className='header'>{currentUser.username}</div>
            <div className='description'>
              {currentUser.designation}
            </div>
          </div>
          <div className='extra content'>
            <i className='envelope outline icon'></i>
            {currentUser.email}
          </div>
        </div>
      </div>
      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>
      //       <strong>{currentUser.username}</strong> Profile
      //     </h3>
      //   </header>
      //   <p>
      //     <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
      //     {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      //   </p>
      //   <p>
      //     <strong>Id:</strong> {currentUser.id}
      //   </p>
      //   <p>
      //     <strong>Username:</strong> {currentUser.username}
      //   </p>
      //   <p>
      //     <strong>Designation:</strong> {currentUser.designation}
      //   </p>
      //   <p>
      //     <strong>Email:</strong> {currentUser.email}
      //   </p>
      //   <strong>Authorities:</strong>
      //   <ul>
      //     {currentUser.roles &&
      //       currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      //   </ul>
      // </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);