/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';
import FindReplace from 'modules/datamapper/fragments/ErrorsStep/components/FindReplace/FindReplace';
import Pagination from 'components/Pagination/Pagination';

/* utils */
import { formatColumns } from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep.util';
import isEqual from 'lodash/isEqual';

/* styles */
import {
  ErrorTitle,
  ModuleContainer,
  ErrorTable,
  TabContainer,
  TabText,
  TabDivider
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';

import theme from 'theme/Theme';
import Divider from 'components/Dividers/Divider';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      index: PropTypes.number,
      indicator: PropTypes.string,
      unit: PropTypes.string,
      subgroup: PropTypes.string,
      area: PropTypes.string,
      areaID: PropTypes.string,
      timePeriod: PropTypes.number,
      source: PropTypes.string,
      dateValue: PropTypes.number,
      footnotes: PropTypes.string
    })
  ),
  errorCells: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.number,
      columnName: PropTypes.string
    })
  )
};

const defaultProps = {
  data: [],
  errorCells: []
};

class ErrorStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'overview',
      dialogOpen: false,
      data: props.data,
      columns: []
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data))
      this.setState({
        data: this.props.data,
        columns: formatColumns(this.props.data)
      });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ tab: 'findReplace', dialogOpen: false });
    }
  }

  colorErrors() {
    this.props.errorCells.forEach(cell => {
      if (cell.row < 10) {
        // so we check the first data entry to get the
        // column number according to the column name
        // and this can work only with the first, cause everyt data
        // entry has all the columns listed(at least should have)
        const colIndex =
          Object.keys(this.props.data[0]).indexOf(cell.columnName) + 1;
        const rowIndex = cell.row + 1;
        document.querySelector(
          `tbody tr:nth-child(${rowIndex}) td:nth-child(${colIndex})`
        ).style.backgroundColor = theme.color.errorCellColor;
      }
    });
  }

  clickFindErrors() {
    this.colorErrors();
    this.setState({ tab: 'findErrors' });
  }

  clickOverview() {
    const allCells = document.querySelectorAll('td');
    allCells.forEach(cell => {
      cell.style.backgroundColor = theme.color.zoomGreyZero;
    });
    this.setState({ tab: 'overview' });
  }

  clickFindReplace() {
    this.colorErrors();
    this.setState({ tab: 'findReplace', dialogOpen: true });
  }

  render() {
    console.log(this.props.data);
    return (
      <ModuleContainer>
        <ErrorTitle>Check & correct erorrs</ErrorTitle>
        <TabContainer>
          <TabText
            style={{
              color:
                this.state.tab === 'overview'
                  ? theme.color.aidsFondsBlue
                  : theme.color.aidsFondsRed
            }}
            onClick={() => this.clickOverview()}
          >
            Overview
          </TabText>
          <TabDivider>|</TabDivider>
          <TabText
            style={{
              color:
                this.state.tab === 'findErrors'
                  ? theme.color.aidsFondsBlue
                  : theme.coloraidsFondsRed
            }}
            onClick={() => this.clickFindErrors()}
          >
            Find errors{' '}
          </TabText>
          <TabDivider>|</TabDivider>
          <TabText
            style={{
              color:
                this.state.tab === 'findReplace'
                  ? theme.color.aidsFondsBlue
                  : theme.color.aidsFondsRed
            }}
            onClick={() => this.clickFindReplace()}
          >
            Find & replace
          </TabText>
          <FindReplace
            open={this.state.dialogOpen}
            setWrapperRef={this.setWrapperRef}
          />
        </TabContainer>
        <Box>
          <ErrorTable columns={this.state.columns} data={this.state.data} />
        </Box>
        <Pagination />
        <Divider />
      </ModuleContainer>
    );
  }
}

ErrorStep.propTypes = propTypes;
ErrorStep.defaultProps = defaultProps;

export default ErrorStep;
