import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { autofill } from 'redux-form';

export default function StreamsDataTable(props) {

  const { streams } = props;

  const columns = [
    { field: 'sig', headerName: 'SIG', width: 100, align: 'right', headerAlign: 'right'},
    { field: 'volume', headerName: 'Volume', width: 150, align: 'right', headerAlign: 'right', type: 'number', valueFormatter: (params) => {
      return (typeof params.value === 'number') ? parseFloat(params.value).toFixed(4) : params.value;
    }},
    { field: 'year', headerName: 'Year', width: 150, align: 'right', headerAlign: 'right'},
    { field: 'party_type', headerName: 'Party Type', width: 150, align: 'right', headerAlign: 'right'},
    { field: 'party_details', headerName: 'Party Details', width: 150, align: 'right', headerAlign: 'right'},
    { field: 'spread_type', headerName: 'Spread Type', width: 200, align: 'right', headerAlign: 'right'},
    { field: 'group_interval', headerName: 'Grp Int', width: 130, align: 'right', headerAlign: 'right'},
    { field: 'shot_interval', headerName: 'Shot Int', width: 130, align: 'right', headerAlign: 'right'},
    { field: 'active_channels', headerName: 'Active Ch', width: 130, align: 'right', headerAlign: 'right'},
    { field: 'fold', headerName: 'Fold', width: 130, align: 'right', headerAlign: 'right'},
    { field: 'max_offset', headerName: 'Max Offset', width: 130, align: 'right', headerAlign: 'right', type: 'number', valueFormatter: (params) => {
      return typeof(params.value) === 'number' ? parseInt(params.value) : params.value;
    }},
  ];

  return (
    <div style={{ height: 900, width: '90%', margin: 'auto'}}>
      <DataGrid rows={streams} columns={columns} pageSize={15} rowsPerPageOptions={[25, 50, 100]} checkboxSelection />
    </div>
  );
}