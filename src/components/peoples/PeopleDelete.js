import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchPeople, deletePeople } from '../../actions/people.action';

class PeopleDelete extends React.Component {
  componentDidMount() {
    this.props.fetchPeople(this.props.match.params._id);
  }
  
  renderActions() {
    const { _id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deletePeople(_id)} className="ui button negative">Delete</button>
        <Link to="/peoples" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.people) {
      return 'Are you sure you want to delete this record?';
    }

    return `Are you sure you want to delete the people with CPF: ${this.props.people.cpf}`;
  }

  render() {
    return (
      <Modal 
        title="Delete People"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/peoples')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { people: state.peoples[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchPeople, deletePeople })(PeopleDelete);