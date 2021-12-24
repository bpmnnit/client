import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRegions } from '../../actions';
import history from '../../history';

class RegionList extends React.Component {
  constructor(props){
    super(props);

    this.sortConfig = 'asc';
  }
  componentDidMount() {
    this.props.fetchRegions();
  }

  renderAdmin(region) {
    if (region.userId === this.props.currentUserId && region.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/regions/edit/${region._id}`}>
            <div className='ui icon tiny button primary' data-tooltip='Edit'>
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/regions/delete/${region._id}`}>
            <div className='ui icon tiny button negative' data-tooltip='Delete'>
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.regions.map(region => {
      return (
        <tr key={region._id}>
          <td><Link to={`/regions/${region.id}`} className="header">{region.title}</Link></td>
          <td>{region.description}</td>  
          <td>{this.renderAdmin(region)}</td>  
        </tr>
      );
    })
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/regions/new'>
          <div className='ui right floated positive button' data-tooltip='New Region'>
            <i className='add icon' style={{margin: 'auto auto'}}></i>
          </div>
        </Link>
      );
    }
  }

  sortTable = () => {
    console.log(this.sortRef.current.lastChild.children);
    const thHtml = this.sortRef.current.innerHTML.toLowerCase();

    this.sortConfig = this.sortConfig === 'asc' ? 'desc' : 'asc';

    console.log(this.props.regions);

  }

  render() {
    return (
      <div className='region-table-wrapper'>
        <h3>Regions</h3>
        {this.renderCreate()}
        <table className='ui sortable compact selectable table'>
          <thead>
            <tr>
              <th onClick={this.sortTable} ref={this.sortRef}>Title<i className={ this.sortConfig === 'asc' ? 'caret up icon' : 'caret down icon'}></i></th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.auth.isLoggedIn) {
    history.push('/login');
    window.location.reload();
  }
  return { regions: Object.values(state.regions), currentUserId: state.auth.user.id, isSignedIn: state.auth.isLoggedIn };
}

export default connect(mapStateToProps, { fetchRegions })(RegionList);