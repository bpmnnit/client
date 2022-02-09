import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPeople } from '../../actions/people.action';

class PeopleView extends React.Component {

  componentDidMount() {
    this.props.fetchPeople(this.props.match.params._id);
  }

  render(){
    if (!this.props.people) {
      return <div>Loading...</div>;
    }

    console.log(this.props);

    const { name, designation } = this.props.people;

    return (
      <div className='people-view-wrapper'>
        <div className='ui centered raised card'>
          <div className='content'>
            <div className='header'>{name}</div>
            <div className='description'>
              {designation}
            </div>
          </div>
          <Link className='ui bottom attached button' to={`/peoples/edit/${this.props.people._id}`}>
            <i className='add icon'></i>
            Update
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { people: state.peoples[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchPeople })(PeopleView);