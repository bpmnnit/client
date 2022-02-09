import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchBasins } from '../../actions/basin.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class BasinList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchBasins(this.state.page, this.state.size);
  }

  renderAdmin(basin) {
    if (basin.userId === this.props.currentUserId && basin.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/basins/edit/${basin._id}`}>
            <div className='ui icon tiny button primary' data-tooltip='Edit'>
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/basins/delete/${basin._id}`}>
            <div className='ui icon tiny button negative' data-tooltip='Delete'>
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    if (this.state.basins) {
      return this.state.basins.map(basin => {
        return (
          <tr key={basin._id}>
            <td><Link to={`/basins/${basin._id}`} className="header">{basin.name}</Link></td>
            <td>{basin.category}</td>  
            <td>{this.renderAdmin(basin)}</td>  
          </tr>
        );
      });  
    }

    return this.props.basins.map(basin => {
      return (
        <tr key={basin._id}>
          <td><Link to={`/basins/${basin._id}`} className="header">{basin.name}</Link></td>
          <td>{basin.category}</td>    
          <td>{this.renderAdmin(basin)}</td>  
        </tr>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/basins/new'>
          <div className='ui right floated positive button' data-tooltip='New Basin'>
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
      this.props.basins.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.basins.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    const filterStr = e.target.value.toLowerCase();
    if (filterStr && filterStr.trim()) {
      this.setState({
        basins: this.props.basins.filter(el => { return el.name.toLowerCase().includes(filterStr) || el.category.toLowerCase().includes(filterStr)})
      });
    }
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchBasins(page, size);
  }

  updatePageSize = (page, size) => {

    // console.log('SIZE: ' + size);
    this.props.fetchBasins(page, size);
  }

  render() {
    return (
      <div className='basin-table-wrapper'>
        <h3>Basins</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search..." onChange={this.filterTable} />
        </div>
        <table className='ui single line selectable celled sortable table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'name' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='name'>Name</th>
              <th className={ this.state.activeTh === 'category' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='category'>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate parent='basins' page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
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
    basins: Object.values(_.omit(state.basins, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.basins.page,
    size: state.basins.size,
    total: state.basins.total
  };
}

export default connect(mapStateToProps, { fetchBasins })(BasinList);