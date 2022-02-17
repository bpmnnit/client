import React from 'react';
import { connect } from 'react-redux';
import { createFp } from '../../actions/fp.action';
import FpForm from './FpForm';

class FpCreate extends React.Component {
  onSubmit = (formValues) => {
    this.props.createFp(formValues);
  }

  render() {
    return (
      <div className='fp-create-wrapper'>
        <h3>Field Party Creation Form</h3>
        <FpForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createFp })(FpCreate);