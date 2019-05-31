/* Base */
import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* utils */
import { formatCsvData } from 'components/charts/tablechart/TableChart.util';

/* consts */
import {
  noData,
  noDatCols
} from 'modules/visualizer/sort/container/fragments/TablechartFragment/TableChartFragment.const';

/* components */
import getTheme from './TableChart.styles';
import DownloadButton from 'components/Buttons/DownloadButton/DownloadButton';
import { CSVLink } from 'react-csv';

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
  columns: noDatCols,
  options
};

class TableChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // so yeah basically we use these different
      // state variables for the different type
      // of export requested by AidsFonds
      diffFormatedCsv: []
    };

    this.exportBtn = React.createRef();

    this.handleDownload = this.handleDownload.bind(this);
    this.clickLink = this.clickLink.bind(this);
  }

  handleDownload() {
    const diffFormatedCsv = formatCsvData(this.props.data);

    this.setState({ diffFormatedCsv }, this.clickLink);
  }

  // so basically we need this workaround
  // to use the CSVLink so that our file would have
  // an actual name, not like with CSV Download
  clickLink() {
    if (
      this.exportBtn &&
      this.exportBtn.current &&
      this.exportBtn.current.link &&
      this.exportBtn.current.link.click &&
      typeof this.exportBtn.current.link.click === 'function'
    ) {
      this.exportBtn.current.link.click();
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={getTheme()}>
        <CSVLink
          data={this.state.diffFormatedCsv}
          filename="tableDownload.csv"
          ref={this.exportBtn}
        />
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
