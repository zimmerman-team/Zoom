/* Base */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* consts */
import { noData } from 'modules/visualizer/sort/container/fragments/TablechartFragment/TableChartFragment.const';

/* components */
import getTheme from './TableChart.styles';
import DownloadButton from 'components/Buttons/DownloadButton/DownloadButton';
import { CSVDownload } from 'react-csv';

// For a list of all options: https://github.com/gregnb/mui-datatables
const options = {
  filter: true,
  filterType: 'dropdown',
  responsive: 'scroll',
  fixedHeader: true,
  rowsPerPage: 100,
  textLabels: {
    toolbar: {
      downloadCsv: 'Download ZOOM Format CSV'
    }
  }
};

const propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  columns: PropTypes.object,
  options: PropTypes.object
};
const defaultProps = {
  title: 'No title given',
  data: noData,
  columns: [],
  options
};

class TableChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // so yeah basically we use these different
      // state variables for the different type
      // of export requested by AidsFonds
      downloadDiffCsv: false,
      diffFormatedCsv: []
    };

    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload() {
    console.log('this.props.data', this.props.data);
  }

  render() {
    return (
      <MuiThemeProvider theme={getTheme()}>
        {this.state.downloadDiffCsv && (
          <CSVDownload data={this.state.diffFormatedCsv} target="_blank" />
        )}
        <MUIDataTable
          title={this.props.title}
          data={this.props.data}
          columns={this.props.columns}
          options={{
            ...this.props.options,
            customToolbar: () => (
              <DownloadButton handleDownload={() => this.handleDownload()} />
            )
          }}
        />
      </MuiThemeProvider>
    );
  }
}

TableChart.propTypes = propTypes;
TableChart.defaultProps = defaultProps;
export default TableChart;
