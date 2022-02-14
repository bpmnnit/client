import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchFps } from '../../actions/fp.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class FpList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchFps(this.state.page, this.state.size);
  }

  renderAdmin(fp) {
    if (fp.userId === this.props.currentUserId && fp.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/fps/edit/${fp._id}`}>
            <div className='ui icon tiny button primary' data-tooltip='Edit'>
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/fps/delete/${fp._id}`}>
            <div className='ui icon tiny button negative' data-tooltip='Delete'>
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  pushRegionHistory = (e) => {
    const region_id = e.target.attributes.region_id.value;
    history.push(`/regions/${region_id}`);
  }

  renderList() {

    console.log(history);
    
    if (this.state.fps) {
      return this.state.fps.map(fp => {
        return (
          <tr key={fp._id}>
            <td><Link to={`/fps/${fp._id}`} className="header">{fp.name}</Link></td>
            <td>{fp.type}</td>
            { console.log(fp.region) }
            <td>
              {
                fp.region != null ? <Link to={`/regions/${fp.region._id}`} className="header" onClick={this.pushRegionHistory} region_id={fp.region._id}>{fp.region.title}</Link> : ''
              }
            </td>
            <td>
              {
                fp.chief != null ? <Link to={`/peoples/${fp.chief._id}`} className="header">{fp.chief.name}</Link> : ''
              }
            </td>
            <td>{this.renderAdmin(fp)}</td>  
          </tr>
        );
      });  
    }

    return this.props.fps.map(fp => {
      return (
        <tr key={fp._id}>
          <td><Link to={`/fps/${fp._id}`} className="header">{fp.name}</Link></td>
            <td>{fp.type}</td>
            <td>
              {
                fp.region != null ? <Link to={`/regions/${fp.region._id}`} className="header" onClick={this.pushRegionHistory} region_id={fp.region._id}>{fp.region.title}</Link> : ''
              }
            </td>
            <td>
              {
                fp.chief != null ? <Link to={`/peoples/${fp.chief._id}`} className="header">{fp.chief.name}</Link> : ''
              }
            </td>  
          <td>{this.renderAdmin(fp)}</td>  
        </tr>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/fps/new'>
          <div className='ui right floated positive button' data-tooltip='New Fp'>
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
      this.props.fps.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.fps.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    const filterStr = e.target.value.toLowerCase();
    if (filterStr && filterStr.trim()) {
      this.setState({
        fps: this.props.fps.filter(el => { return el.name.toLowerCase().includes(filterStr) || el.type.toLowerCase().includes(filterStr)})
      });
    }
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchFps(page, size);
  }

  updatePageSize = (page, size) => {

    // console.log('SIZE: ' + size);
    this.props.fetchFps(page, size);
  }

  render() {
    return (
      <div className='fp-table-wrapper'>
        <h3>Fps</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search by Name or type..." onChange={this.filterTable} />
        </div>
        <table className='ui single line selectable celled sortable table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'name' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='name'>Name</th>
              <th className={ this.state.activeTh === 'type' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='category'>Type</th>
              <th className={ this.state.activeTh === 'region' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='region'>Region</th>
              <th className={ this.state.activeTh === 'chief' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='chief'>Chief</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate parent='fps' page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  if (!state.auth.isLoggedIn) {
    history.push('/login');
    window.location.reload();
  }
  return {
    fps: Object.values(_.omit(state.fps, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.fps.page,
    size: state.fps.size,
    total: state.fps.total
  };
}

export default connect(mapStateToProps, { fetchFps })(FpList);