import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBasin } from '../../actions/basin.action';

class BasinView extends React.Component {

  componentDidMount() {
    this.props.fetchBasin(this.props.match.params._id);
  }

  render(){
    if (!this.props.basin) {
      return <div>Loading...</div>;
    }

    const { name, category } = this.props.basin;

    return (
      <div className='basin-view-wrapper'>
        <div className='ui centered raised card'>
          <div className='content'>
            <div className='header'>{name}</div>
            <div className='description'>
              {category}
            </div>
          </div>
          <Link className='ui bottom attached button' to={`/basins/edit/${this.props.basin._id}`}>
            <i className='add icon'></i>
            Update
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { basin: state.basins[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBasin })(BasinView);