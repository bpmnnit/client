import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function StreamsDataTable(props) {

  const { streams } = props;

  const columns = [
    { field: 'sig', headerName: 'SIG', width: 100, align: 'right', headerAlign: 'right'},
    { field: 'volume', headerName: 'Volume', width: 150, align: 'right', headerAlign: 'right', type: 'number', valueFormatter: (params) => {
      return (typeof params.value === 'number') ? parseFloat(params.value).toFixed(4) : params.value;
    }, editable: true},
    { field: 'year', headerName: 'Year', width: 150, align: 'right', headerAlign: 'right', editable: true},
    { field: 'party_type', headerName: 'Party Type', width: 150, align: 'right', headerAlign: 'right', editable: true},
    { field: 'party_details', headerName: 'Party Details', width: 160, align: 'right', headerAlign: 'right', editable: true},
    { field: 'spread_type', headerName: 'Spread Type', width: 200, align: 'right', headerAlign: 'right', editable: true},
    { field: 'group_interval', headerName: 'Grp Int', width: 130, align: 'right', headerAlign: 'right', editable: true},
    { field: 'shot_interval', headerName: 'Shot Int', width: 130, align: 'right', headerAlign: 'right', editable: true},
    { field: 'active_channels', headerName: 'Active Channels', width: 170, align: 'right', headerAlign: 'right', editable: true},
    { field: 'fold', headerName: 'Fold', width: 130, align: 'right', headerAlign: 'right', editable: true},
    { field: 'max_offset', headerName: 'Max Offset', width: 150, align: 'right', headerAlign: 'right', type: 'number', valueFormatter: (params) => {
      return typeof(params.value) === 'number' ? parseInt(params.value) : params.value;
    }, editable: true},
  ];

  return (
    <div style={{ height: 900, width: '90%', margin: 'auto'}}>
      <DataGrid rows={streams} columns={columns} autoPageSize={true} />
    </div>
  );
}