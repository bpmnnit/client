import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { fetchSurveys } from '../../actions/survey.action';
import history from '../../history';
import Paginate from '../paginate/Paginate';

class SurveyList extends React.Component {
  state = {
    direction: '',
    activeTh: null,
    page: 1,
    size: 30,
  };

  componentDidMount() {
    this.props.fetchSurveys(this.state.page, this.state.size);
  }

  renderAdmin(survey) {
    if (survey.userId === this.props.currentUserId && survey.userId !== null) {
      return(
        <div className="right floated content">
          <Link to={`/surveys/edit/${survey._id}`}>
            {/* <div className='ui icon tiny button primary' data-tooltip='Edit'> */}
            <div className='ui icon tiny button primary'>
              <i className='edit icon'></i>
            </div>
          </Link>
          <Link to={`/surveys/delete/${survey._id}`}>
            {/* <div className='ui icon tiny button negative' data-tooltip='Delete'> */}
            <div className='ui icon tiny button negative'>
              <i className='trash icon'></i>
            </div>
          </Link>
        </div>
      );
    }
  }

  renderList() {

    if (this.state.surveys) {
      return this.state.surveys.map(survey => {
        return (
          <tr key={survey._id + survey.sig}>
            <td><Link to={`/surveys/${survey._id}`} className="header">{survey.sig}</Link></td>
            <td>{survey.basin}</td>
            <td>{survey.region}</td>
            <td>{survey.area}</td>
            <td>{survey.fp}</td>
            <td>{survey.qow}</td>
            <td>{survey.type}</td>
            <td>{survey.fold}</td>
            <td>{survey.conversion_factor}</td>
            <td>{survey.mgh}</td>
            <td>{survey.total_shots}</td>
            <td>{survey.rec_inst}</td>
            <td>{survey.sensor}</td>
            <td>{survey.start_date}</td>
            <td>{survey.end_date}</td>
            <td>{this.renderAdmin(survey)}</td>  
          </tr>
        );
      });  
    }

    return this.props.surveys.map(survey => {
      return (
        <tr key={survey._id + survey.sig}>
          <td><Link to={`/surveys/${survey._id}`} className="header">{survey.sig}</Link></td>
          <td>{survey.basin}</td>
            <td>{survey.region}</td>
            <td>{survey.area}</td>
            <td>{survey.fp}</td>
            <td>{survey.qow}</td>
            <td>{survey.type}</td>
            <td>{survey.fold}</td>
            <td>{survey.conversion_factor}</td>
            <td>{survey.mgh}</td>
            <td>{survey.total_shots}</td>
            <td>{survey.rec_inst}</td>
            <td>{survey.sensor}</td>
            <td>{survey.start_date}</td>
            <td>{survey.end_date}</td>
            <td>{this.renderAdmin(survey)}</td>  
        </tr>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <Link to='/surveys/new'>
          <div className='ui right floated positive button' data-tooltip='New Survey'>
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
      this.props.surveys.sort((a, b) => a[colname] > b[colname] ? 1: -1);
      this.setState({ direction: 'ascending' });
    } else {
      this.props.surveys.sort((a, b) => a[colname] < b[colname] ? 1: -1);
      this.setState({ direction: 'descending' });
    }
  }

  filterTable = (e) => {
    const filterStr = e.target.value.toLowerCase();
    if (filterStr && filterStr.trim()) {
      this.setState({
        surveys: this.props.surveys.filter(el => { return el.name.toLowerCase().includes(filterStr) || el.type.toLowerCase().includes(filterStr)})
      });
    }
  }

  updatePage = (page, size) => {
    // console.log('PAGE: ' + page);
    this.props.fetchSurveys(page, size);
  }

  updatePageSize = (page, size) => {

    // console.log('SIZE: ' + size);
    this.props.fetchSurveys(page, size);
  }

  render() {
    return (
      <div className='survey-table-wrapper'>
        <h3>Surveys</h3>
        {this.renderCreate()}
        <div className='ui icon input'>
          <i className='search icon'></i>
          <input type="text" placeholder="Search by SIG or others..." onChange={this.filterTable} />
        </div>
        <table className='ui compact selectable celled sortable fixed   table'>
          <thead>
            <tr>
              <th className={ this.state.activeTh === 'sig' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='sig'>SIG</th>
              <th className={ this.state.activeTh === 'basin' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='basin'>Basin</th>
              <th className={ this.state.activeTh === 'region' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='region'>Region</th>
              <th className={ this.state.activeTh === 'area' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='area'>Area</th>
              <th className={ this.state.activeTh === 'fp' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='fp'>FP</th>
              <th className={ this.state.activeTh === 'qow' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='qow'>Volume</th>
              <th className={ this.state.activeTh === 'type' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='type'>Type</th>
              <th className={ this.state.activeTh === 'fold' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='fold'>Fold</th>
              <th className={ this.state.activeTh === 'convftr' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='convftr'>ConvFactor</th>
              <th className={ this.state.activeTh === 'mgh' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='mgh'>MGH</th>
              <th className={ this.state.activeTh === 'total_shots' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='total_shots'>TotalShots</th>
              <th className={ this.state.activeTh === 'rec_inst' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='rec_inst'>RecInst</th>
              <th className={ this.state.activeTh === 'sensor' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='sensor'>Sensor</th>
              <th className={ this.state.activeTh === 'start_date' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='start_date'>StartDate</th>
              <th className={ this.state.activeTh === 'end_date' ? `sorted ${this.state.direction}` : ''} onClick={this.sortTable} colname='end_date'>EndDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.renderList()}
          </tbody>
        </table>
        <Paginate parent='surveys' page={this.props.page} size={this.props.size} total={this.props.total} getPage={this.updatePage} setPageSize={this.updatePageSize}/>
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
    surveys: Object.values(_.omit(state.surveys, ['page', 'size', 'total'])),
    currentUserId: state.auth.user.id,
    isSignedIn: state.auth.isLoggedIn,
    page: state.surveys.page,
    size: state.surveys.size,
    total: state.surveys.total
  };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);