import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchRegions } from '../../actions/region.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class RegionList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchRegions(this.state.page, this.state.size);
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
    if (this.state.regions) {
      return this.state.regions.map(region => {
        return (
          <tr key={region._id}>
            <td><Link to={`/regions/${region._id}`} className="header">{region.title}</Link></td>
            <td>{region.description}</td>  
            <td>{this.renderAdmin(region)}</td>  
          </tr>
        );
      });  
    }

    return this.props.regions.map(region => {
      return (
        <tr key={region._id}>
          <td><Link to={`/regions/${region._id}`} className="header">{region.title}</Link></td>
          <td>{region.description}</td>  
          <td>{this.renderAdmin(region)}</td>  
        </tr>
      );
    });
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

  sortTable = (e) => {
    const colname = e.target.attributes.colname.value;
    this.setState({ activeTh: colname });
    if (this.state.direction === '' || this.state.direction === 'descending') {
      this.props.regions.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.regions.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    const filterStr = e.target.value.toLowerCase();
    this.setState({
      regions: this.props.regions.filter(el => { return el.title.toLowerCase().includes(filterStr) || el.description.toLowerCase().includes(filterStr)})
    });
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchRegions(page, size);
  }

  updatePageSize = (page, size) => {
    // console.log('SIZE: ' + size);
    this.props.fetchRegions(page, size);
  }

  render() {
    return (
      <div className='region-table-wrapper'>
        <h3>Regions</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search..." onChange={this.filterTable} />
        </div>
        <table className='ui celled sortable table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'title' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='title'>Title</th>
              <th className={ this.state.activeTh === 'description' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='description'>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('Map state to props Regions');
  console.log(state.regions);
  if (!state.auth.isLoggedIn) {
    history.push('/login');
    window.location.reload();
  }
  return {
    regions: Object.values(_.omit(state.regions, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.regions.page,
    size: state.regions.size,
    total: state.regions.total
  };
}

export default connect(mapStateToProps, { fetchRegions })(RegionList);