import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchBasin, deleteBasin } from '../../actions/basin.action';

class BasinDelete extends React.Component {
  componentDidMount() {
    this.props.fetchBasin(this.props.match.params._id);
  }
  
  renderActions() {
    const { _id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteBasin(_id)} className="ui button negative">Delete</button>
        <Link to="/basins" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.basin) {
      return 'Are you sure you want to delete this record?';
    }

    return `Are you sure you want to delete the basin with name: ${this.props.basin.name}`;
  }

  render() {
    return (
      <Modal 
        title="Delete Basin"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/basins')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { basin: state.basins[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchBasin, deleteBasin })(BasinDelete);