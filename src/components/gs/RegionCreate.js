import React from 'react';
import { connect } from 'react-redux';
import RegionForm from './RegionForm';

class RegionCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createRegion(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a Region</h3>
        <RegionForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null)(RegionCreate);