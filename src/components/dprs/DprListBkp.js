import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchDprs } from '../../actions/dpr.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class DprList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchDprs(this.state.page, this.state.size);
  }

  renderAdmin(dpr) {
    if (dpr.userId === this.props.currentUserId && dpr.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/dprs/edit/${dpr._id}`}>
            <div className='ui icon tiny button primary' data-tooltip='Edit'>
            {/* <div className='ui icon tiny button primary'> */}
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/dprs/delete/${dpr._id}`}>
            <div className='ui icon tiny button negative' data-tooltip='Delete'>
            {/* <div className='ui icon tiny button negative'> */}
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  renderList() {

    if (this.state.dprs) {
      return this.state.dprs.map(dpr => {
        return (
          <tr key={dpr._id + dpr.sig}>
            <td><Link to={`/dprs/${dpr._id}`} className="header">{dpr.sig}</Link></td>
            <td>{dpr.area}</td>
            <td>{dpr.region}</td>
            <td>{dpr.type}</td>
            <td>{dpr.date}</td>
            <td>{dpr.fp}</td>
            <td>{dpr.acc}</td>
            <td>{dpr.rej}</td>
            <td>{dpr.skp}</td>
            <td>{dpr.rep}</td>
            <td>{dpr.rec}</td>
            <td>{dpr.cov_shots}</td>
            <td>{dpr.coverage}</td>
            <td>{dpr.remarks}</td>
            <td>{this.renderAdmin(dpr)}</td>  
          </tr>
        );
      });  
    }

    return this.props.dprs.map(dpr => {
      return (
        <tr key={dpr._id + dpr.sig}>
          <td><Link to={`/dprs/${dpr._id}`} className="header">{dpr.sig}</Link></td>
          <td>{dpr.area}</td>
          <td>{dpr.region}</td>
          <td>{dpr.type}</td>
          <td>{dpr.date}</td>
          <td>{dpr.fp}</td>
          <td>{dpr.acc}</td>
          <td>{dpr.rej}</td>
          <td>{dpr.skp}</td>
          <td>{dpr.rep}</td>
          <td>{dpr.rec}</td>
          <td>{dpr.cov_shots}</td>
          <td>{dpr.coverage}</td>
          <td>{dpr.remarks}</td>
          <td>{this.renderAdmin(dpr)}</td>  
        </tr>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/dprs/new'>
          <div className='ui right floated positive button' data-tooltip='New Dpr'>
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
      this.props.dprs.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.dprs.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    const filterStr = e.target.value.toLowerCase();
    if (filterStr && filterStr.trim()) {
      this.setState({
        dprs: this.props.dprs.filter(el => { return el.name.toLowerCase().includes(filterStr) || el.type.toLowerCase().includes(filterStr)})
      });
    }
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchDprs(page, size);
  }

  updatePageSize = (page, size) => {

    // console.log('SIZE: ' + size);
    this.props.fetchDprs(page, size);
  }

  render() {
    return (
      <div className='dpr-table-wrapper'>
        <h3>Dprs</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search by SIG or others..." onChange={this.filterTable} />
        </div>
        <table className='ui compact selectable celled sortable single line table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'sig' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='sig'>SIG</th>
              <th className={ this.state.activeTh === 'area' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='area'>Area</th>
              <th className={ this.state.activeTh === 'region' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='region'>Region</th>
              <th className={ this.state.activeTh === 'type' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='type'>Type</th>
              <th className={ this.state.activeTh === 'date' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='date'>Date</th>
              <th className={ this.state.activeTh === 'fp' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='fp'>FP</th>
              <th className={ this.state.activeTh === 'acc' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='acc'>Acc</th>
              <th className={ this.state.activeTh === 'rej' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='rej'>Rej</th>
              <th className={ this.state.activeTh === 'skp' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='skp'>Skp</th>
              <th className={ this.state.activeTh === 'rep' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='rep'>Rep</th>
              <th className={ this.state.activeTh === 'rec' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='rec'>Rec</th>
              <th className={ this.state.activeTh === 'cov_shots' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='cov_shots'>CovShots</th>
              <th className={ this.state.activeTh === 'coverage' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='coverage'>Coverage</th>
              <th className={ this.state.activeTh === 'remarks' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='remarks'>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate parent='dprs' page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
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
    dprs: Object.values(_.omit(state.dprs, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.dprs.page,
    size: state.dprs.size,
    total: state.dprs.total
  };
}

export default connect(mapStateToProps, { fetchDprs })(DprList);