import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchPeople, editPeople } from '../../actions/people.action';
import PeopleForm from './PeopleForm';

class PeopleEdit extends React.Component {
  componentDidMount() {
    this.props.fetchPeople(this.props.match.params._id);
  }

  onSubmit = (formValues) => {
    this.props.editPeople(this.props.match.params._id, formValues);
  };

  render() {
    if (!this.props.people) {
      return <div>Loading...</div>
    }
    return (
      <div className='people-edit-wrapper'>
        <h3>Edit a People</h3>
        <PeopleForm initialValues={
          _.pick(this.props.people,
            'cpf', 'name', 'email', 'designation', 'discipline', 'charge', 'level', 'mobile', 'crc'
          )} onSubmit={this.onSubmit}/>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return { people: state.peoples[ownProps.match.params._id] };
};

export default connect(mapStateToProps, { fetchPeople, editPeople })(PeopleEdit);