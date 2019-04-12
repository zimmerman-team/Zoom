import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core';
import getTheme from './TableChart.styles';
import tableDataMock from './TableData.mock';
import tableColumnsMock from './TableColumns.mock';

// TODO: Fix responsive styling issues

// For a list of all options: https://github.com/gregnb/mui-datatables
const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'scroll',
  fixedHeader: true
};

const propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
  columns: PropTypes.object,
  options: PropTypes.object
};
const defaultProps = {
  data: tableDataMock,
  columns: tableColumnsMock,
  options: options
};

class TableChart extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={getTheme()}>
        <MUIDataTable
          title="H6 Headline"
          data={this.props.data}
          columns={this.props.columns}
          options={this.props.options}
        />
      </MuiThemeProvider>
    );
  }
}

TableChart.propTypes = propTypes;
TableChart.defaultProps = defaultProps;
export default TableChart;
