import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRegion } from '../../actions/region.action';

class RegionView extends React.Component {

  componentDidMount() {
    this.props.fetchRegion(this.props.match.params._id);
  }

  render(){
    if (!this.props.region) {
      return <div>Loading...</div>;
    }

    console.log(this.props);

    const { title, description } = this.props.region;

    return (
      <div className='region-view-wrapper'>
        <div className='ui centered raised card'>
          <div className='content'>
            <div className='header'>{title}</div>
            <div className='description'>
              {description}
            </div>
          </div>
          <Link className='ui bottom attached button' to={`/regions/edit/${this.props.region._id}`}>
            <i className='add icon'></i>
            Update
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { region: state.regions[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchRegion })(RegionView);