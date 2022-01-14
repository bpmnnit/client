import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchRegion, deleteRegion } from '../../actions/region.action';

class RegionDelete extends React.Component {
  componentDidMount() {
    this.props.fetchRegion(this.props.match.params._id);
  }
  
  renderActions() {
    const { _id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteRegion(_id)} className="ui button negative">Delete</button>
        <Link to="/regions" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.region) {
      return 'Are you sure you want to delete this record?';
    }

    return `Are you sure you want to delete the region with title: ${this.props.region.title}`;
  }

  render() {
    return (
      <Modal 
        title="Delete Region"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/regions')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { region: state.regions[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchRegion, deleteRegion })(RegionDelete);