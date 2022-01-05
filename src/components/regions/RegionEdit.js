import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchRegion, editRegion } from '../../actions/region.action';
import RegionForm from './RegionForm';

class RegionEdit extends React.Component {
  componentDidMount() {
    this.props.fetchRegion(this.props.match.params._id);
  }

  onSubmit = (formValues) => {
    this.props.editRegion(this.props.match.params._id, formValues);
  };

  render() {
    if (!this.props.region) {
      return <div>Loading...</div>
    }
    return (
      <div className='region-edit-wrapper'>
        <h3>Edit a Region</h3>
        <RegionForm initialValues={_.pick(this.props.region, 'title', 'description')} onSubmit={this.onSubmit}/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { region: state.regions[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchRegion, editRegion })(RegionEdit);