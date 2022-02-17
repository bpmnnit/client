import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchFp, deleteFp } from '../../actions/fp.action';

class FpDelete extends React.Component {
  componentDidMount() {
    this.props.fetchFp(this.props.match.params._id);
  }
  
  renderActions() {
    const { _id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteFp(_id)} className="ui button negative">Delete</button>
        <Link to="/fps" className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.fp) {
      return 'Are you sure you want to delete this record?';
    }

    return `Are you sure you want to delete the field party: ${this.props.fp.name}`;
  }

  render() {
    return (
      <Modal 
        title="Delete Field Party"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/fps')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { fp: state.fps[ownProps.match.params._id] }
}

export default connect(mapStateToProps, { fetchFp, deleteFp })(FpDelete);