import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchBasin, editBasin } from '../../actions/basin.action';
import BasinForm from './BasinForm';

class BasinEdit extends React.Component {
  componentDidMount() {
    this.props.fetchBasin(this.props.match.params._id);
  }

  onSubmit = (formValues) => {
    this.props.editBasin(this.props.match.params._id, formValues);
  };

  render() {
    if (!this.props.basin) {
      return <div>Loading...</div>
    }
    return (
      <div className='basin-edit-wrapper'>
        <h3>Edit a Basin</h3>
        <BasinForm initialValues={
          _.pick(this.props.basin,
            'name', 'category'
          )} onSubmit={this.onSubmit}/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { basin: state.basins[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchBasin, editBasin })(BasinEdit);