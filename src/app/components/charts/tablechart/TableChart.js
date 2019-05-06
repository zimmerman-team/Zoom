/* Base */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* components */
import getTheme from './TableChart.styles';
import tableDataMock from './TableData.mock';
import tableColumnsMock from './TableColumns.mock';

// For a list of all options: https://github.com/gregnb/mui-datatables
const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'scroll',
  fixedHeader: true,
  rowsPerPage: 100
};

const propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.object,
  options: PropTypes.object
};
const defaultProps = {
  title: 'No title given',
  data: [],
  columns: [],
  options
};

class TableChart extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={getTheme()}>
        <MUIDataTable
          title={this.props.title}
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
