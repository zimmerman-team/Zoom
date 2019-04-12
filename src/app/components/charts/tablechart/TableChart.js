import React from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core';
import getTheme from './TableChart.styles';
import tableDataMock from './TableData.mock';
import tableColumnsMock from './TableColumns.mock';

//TODO: Fix responsive styling issues
class TableChart extends React.Component {
  render() {
    //For a list of all options: https://github.com/gregnb/mui-datatables
    const options = {
      filter: true,
      filterType: 'dropdown',
      responsive: 'scroll',
      fixedHeader: true
    };

    return (
      <MuiThemeProvider theme={getTheme()}>
        <MUIDataTable
          title="H6 Headline"
          data={tableDataMock}
          columns={tableColumnsMock}
          options={options}
        />
      </MuiThemeProvider>
    );
  }
}

export default TableChart;
