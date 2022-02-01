import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchPeoples } from '../../actions/people.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class PeopleList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchPeoples(this.state.page, this.state.size);
  }

  renderAdmin(people) {
    if (people.userId === this.props.currentUserId && people.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/peoples/edit/${people._id}`}>
            <div className='ui icon tiny button primary' data-tooltip='Edit'>
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/peoples/delete/${people._id}`}>
            <div className='ui icon tiny button negative' data-tooltip='Delete'>
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    if (this.state.peoples) {
      return this.state.peoples.map(people => {
        return (
          <tr key={people._id}>
            <td><Link to={`/peoples/${people._id}`} className="header">{people.cpf}</Link></td>
            <td>{people.name}</td>  
            <td>{people.email}</td>  
            <td>{people.designation}</td>  
            <td>{people.discipline}</td>  
            <td>{people.charge}</td>  
            <td>{people.level}</td>  
            <td>{people.mobile ? people.mobile.low: ''}</td>  
            <td>{people.crc}</td>  
            <td>{this.renderAdmin(people)}</td>  
          </tr>
        );
      });  
    }

    return this.props.peoples.map(people => {
      return (
        <tr key={people._id}>
          <td><Link to={`/peoples/${people._id}`} className="header">{people.cpf}</Link></td>
          <td>{people.name}</td>  
          <td>{people.email}</td>  
          <td>{people.designation}</td>  
          <td>{people.discipline}</td>  
          <td>{people.charge}</td>  
          <td>{people.level}</td>  
          <td>{people.mobile ? people.mobile.low : ''}</td>  
          <td>{people.crc}</td>    
          <td>{this.renderAdmin(people)}</td>  
        </tr>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/peoples/new'>
          <div className='ui right floated positive button' data-tooltip='New People'>
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
      this.props.peoples.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.peoples.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    console.log(this.props.peoples);
    const filterStr = e.target.value.toLowerCase();
    if (filterStr && filterStr.trim()) {
      this.setState({
        peoples: this.props.peoples.filter(el => { return el.cpf.toString().toLowerCase().includes(filterStr) || el.name.toLowerCase().includes(filterStr) || el.email.toLowerCase().includes(filterStr) || el.designation.toLowerCase().includes(filterStr) || el.discipline.toLowerCase().includes(filterStr) || el.charge.toLowerCase().includes(filterStr) || el.level.toLowerCase().includes(filterStr) || el.crc.toLowerCase().includes(filterStr) || (el.mobile && el.mobile.low.toString().toLowerCase().includes(filterStr))})
      });
    }
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchPeoples(page, size);
  }

  updatePageSize = (page, size) => {

    // console.log('SIZE: ' + size);
    this.props.fetchPeoples(page, size);
  }

  render() {
    return (
      <div className='people-table-wrapper'>
        <h3>Peoples</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search..." onChange={this.filterTable} />
        </div>
        <table className='ui celled sortable table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'cpf' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='cpf'>CPF</th>
              <th className={ this.state.activeTh === 'name' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='name'>Name</th>
              <th className={ this.state.activeTh === 'email' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='email'>Email</th>
              <th className={ this.state.activeTh === 'designation' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='designation'>Designation</th>
              <th className={ this.state.activeTh === 'discipline' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='discipline'>Discipline</th>
              <th className={ this.state.activeTh === 'charge' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='charge'>Charge</th>
              <th className={ this.state.activeTh === 'level' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='level'>Level</th>
              <th className={ this.state.activeTh === 'mobile' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='mobile'>Mobile</th>
              <th className={ this.state.activeTh === 'crc' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='crc'>CRC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate parent='peoples' page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
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
    peoples: Object.values(_.omit(state.peoples, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.peoples.page,
    size: state.peoples.size,
    total: state.peoples.total
  };
}

export default connect(mapStateToProps, { fetchPeoples })(PeopleList);