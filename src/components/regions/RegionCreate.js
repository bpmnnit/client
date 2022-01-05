import React from 'react';
import { connect } from 'react-redux';
import { createRegion } from '../../actions/region.action';
import RegionForm from './RegionForm';

class RegionCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createRegion(formValues);
  }

  render() {
    return (
      <div className='region-create-wrapper'>
        <h3>Create a Region</h3>
        <RegionForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createRegion })(RegionCreate);