import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFp } from '../../actions/fp.action';
import Loader from '../Loader';
import history from '../../history';

class FpView extends React.Component {

  componentDidMount() {
    this.props.fetchFp(this.props.match.params._id);
  }

  render(){
    if (!this.props.fp) {
      return <Loader />;
    }

    const { name, type } = this.props.fp;

    return (
      <div className='fp-view-wrapper'>
        <div className='ui centered raised card'>
          <div className='content'>
            <div className='header'>{name}</div>
            <div className='description'>
              {type}
            </div>
          </div>
          <Link className='ui bottom attached button' to={`/fps/edit/${this.props.fp._id}`}>
            <i className='add icon'></i>
            Update
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!state.auth.isLoggedIn) {
    history.push('/login');
    window.location.reload();
  }
  return { fp: state.fps[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchFp })(FpView);