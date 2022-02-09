import React from 'react';
import { connect } from 'react-redux';
import { createBasin } from '../../actions/basin.action';
import BasinForm from './BasinForm';

class BasinCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createBasin(formValues);
    // console.log(formValues);
  }

  render() {
    return (
      <div className='basin-create-wrapper'>
        <h3>Create a Basin</h3>
        <BasinForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createBasin })(BasinCreate);