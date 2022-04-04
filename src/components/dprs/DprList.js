import React from 'react';
import { connect } from 'react-redux';
// import ReactDataGrid from '@inovua/reactdatagrid-community';
// import '@inovua/reactdatagrid-community/index.css';

import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

import _ from 'lodash';
import { fetchDprs } from '../../actions/dpr.action';
import history from '../../history';

class DprList extends React.Component {
  state = {
      direction: '',
      activeTh: null,
      page: 1,
      size: 30
      // columns: [
      //   { field: 'sig', header: 'SIG', defaultFlex: 1 },
      //   { field: 'area', header: 'Area', defaultFlex: 1 },
      //   { field: 'region', header: 'Region', defaultFlex: 1 },
      //   { field: 'type', header: 'Type', defaultFlex: 1 },
      //   { field: 'date', header: 'Date', defaultFlex: 1 },
      //   { field: 'fp', header: 'FP', defaultFlex: 1},
      //   { field: 'acc', header: 'Acc', defaultFlex: 1 },
      //   { field: 'rej', header: 'Rej', defaultFlex: 1 },
      //   { field: 'skp', header: 'Skp', defaultFlex: 1 },
      //   { field: 'rep', header: 'Rep', defaultFlex: 1 },
      //   { field: 'rec', header: 'Rec', defaultFlex: 1 },
      //   { field: 'cov_shots', header: 'CovShots' , defaultFlex: 1 },
      //   { field: 'coverage', header: 'Coverage', defaultFlex: 1 },
      //   { field: 'remarks', header: 'Remarks', defaultFlex: 1 }
      // ],
      // gridstyle: { minHeight: 550 }
    };

  componentDidMount() {
    this.props.fetchDprs(this.state.page, this.state.size);
  }
  // getRows = () => {
  //   return this.props.dprs.map(dpr => ({
  //     ...dpr,
  //     id: dpr._id
  //   }));
  // }

  // render() {
  //   console.log('Props: ', this.props);
  //   const dataSource = {
  //     data: this.props.dprs ? this.props.dprs : [],
  //     count: this.props.total ? this.props.total * 1 : 0
  //   };
  //   return (
  //     <ReactDataGrid 
  //       idProperty='_id'
  //       columns={this.state.columns}
  //       style={this.state.gridstyle}
  //       dataSource={dataSource}
  //     />
  //   );
  // }
  render() {
    // const colHeaders = Object.keys(this.props.dprs[0]).map(key => key);
    return(
      <div id="hot-app">
        <HotTable
          licenseKey={'non-commercial-and-evaluation'}
          data={this.props.dprs}
          colHeaders={['_id', 'sig', 'area', 'region', 'type', 'date', 'fp', 'acc', 'rej', 'skp', 'rep', 'rec', 'cov_shots', 'coverage', 'remarks', 'userId']}
          rowHeaders={true}
          width='100%'
          height='auto'
          manualColumnResize={true}
          filters={true}
          hiddenColumns={{ columns: [0] }}
          stretchH='all'
        />
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