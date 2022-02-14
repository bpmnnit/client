import React from 'react';

class Loader extends React.Component {
  render () {
    return (
      <div className='ui center aligned container'>
        <div className='ui active centered inline loader'></div>
        Loading...
      </div>
    );
  }
};

export default Loader;