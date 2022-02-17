import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchFp, editFp } from '../../actions/fp.action';
import Loader from '../Loader';
import FpForm from './FpForm';

class FpEdit extends React.Component {
  componentDidMount() {
    this.props.fetchFp(this.props.match.params._id);
  }

  onSubmit = (formValues) => {
    this.props.editFp(this.props.match.params._id, formValues);
  };

  render() {
    if (!this.props.fp) {
      return <Loader />;
    }
    return (
      <div className='fp-edit-wrapper'>
        <h3>Edit Field Party</h3>
        <FpForm initialValues={_.pick(this.props.fp, 'name', 'type', 'region', 'chief')} onSubmit={this.onSubmit}/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { fp: state.fps[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchFp, editFp })(FpEdit);