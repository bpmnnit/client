import React from 'react';
import { connect } from 'react-redux';
import { createPeople } from '../../actions/people.action';
import PeopleForm from './PeopleForm';

class PeopleCreate extends React.Component {
  onSubmit = (formValues) => {
    //this.props.createPeople(formValues);
    console.log(formValues);
  }

  render() {
    return (
      <div className='people-create-wrapper'>
        <h3>Create a People</h3>
        <PeopleForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createPeople })(PeopleCreate);