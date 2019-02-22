/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';
import FindReplace from 'modules/datamapper/fragments/ErrorsStep/components/FindReplace/FindReplace';
import Pagination from 'components/Pagination/Pagination';
import ZoomButton from 'components/ZoomButton/ZoomButton';
import SimpleEditDialog from 'components/Dialog/SimpleEditDialog/SimpleEditDialog';
import Divider from 'components/Dividers/Divider';

/* utils */
import { formatColumns } from 'modules/datamapper/fragments/ErrorsStep/ErrorsStep.util';
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';

/* styles */
import {
  ErrorTitle,
  ModuleContainer,
  ErrorTable,
  TabContainer,
  TabText,
  ButtonContainer,
  AboveTableOptions,
  TabDivider
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';

import theme from 'theme/Theme';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      index: PropTypes.string,
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
      col: PropTypes.number
    })
  ),
  columnHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  pageCount: PropTypes.number,
  changePage: PropTypes.func,
  findReplaceValues: PropTypes.func,
  resetFindReplace: PropTypes.func,
  loading: PropTypes.bool,
  checkRows: PropTypes.func,
  deleteRows: PropTypes.func,
  checkedRows: PropTypes.bool,
  updateCell: PropTypes.func,
  forcePage: PropTypes.number
};

const defaultProps = {
  data: [],
  errorCells: [],
  columnHeaders: [],
  pageCount: 100,
  changePage: undefined,
  findReplaceValues: undefined,
  resetFindReplace: undefined,
  loading: false,
  checkRows: undefined,
  deleteRows: undefined,
  checkedRows: false,
  updateCell: undefined,
  forcePage: 0
};

class ErrorStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'overview',
      dialogOpen: false,
      data: props.data,
      columns: [],
      selectedHeader: undefined,
      cellDialogOpen: false,
      clickedCellValues: {}
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.colorFoundReplaced = this.colorFoundReplaced.bind(this);
    this.handleCellClick = this.handleCellClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {
      this.setState(
        {
          data: this.props.data,
          columns: formatColumns(
            this.props.data,
            this.props.checkRows,
            this.handleCellClick
          )
        },
        this.changeColors
      );
    }
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

  // so this will basically color the cells depending on the tab
  // and the data in the tab
  changeColors() {
    if (this.state.tab === 'findErrors' || this.state.tab === 'findReplace') {
      this.resetColors();
      this.colorErrors();
      this.colorFoundReplaced();
    }
  }

  colorErrors() {
    this.props.errorCells.forEach(cell => {
      const colInd = findIndex(this.state.columns, ['property', cell.col]) + 1;
      document.querySelector(
        `tbody tr:nth-child(${cell.row}) td:nth-child(${colInd})`
      ).style.backgroundColor = theme.color.errorCellColor;
    });
  }

  // so to color the found and replaced values
  // we don't actually need to format anything
  // because we already have the selected column header
  // from where we can get the col index
  // and basically all rows in that retrieved table need to be colored
  // cause only rows where the value was found are actually shown
  colorFoundReplaced() {
    if (this.state.selectedHeader && this.state.tab === 'findReplace') {
      const colIndex =
        findIndex(this.props.columnHeaders, [
          'label',
          this.state.selectedHeader
        ]) + 3;

      const cells = document.querySelectorAll(
        `tbody td:nth-child(${colIndex}) > div > div`
      );

      cells.forEach(cell => {
        // do whatever
        cell.style.color = theme.color.aidsFondsBlue;
      });
    }
  }

  resetColors() {
    const allCells = document.querySelectorAll('td');
    allCells.forEach(cell => {
      cell.style.backgroundColor = theme.color.zoomGreyZero;
    });
    const allCellsText = document.querySelectorAll('td > div > div');
    allCellsText.forEach(text => {
      text.style.color = theme.color.zoomBlack;
    });
  }

  clickFindErrors() {
    if (this.state.tab !== 'findErrors') {
      this.props.resetFindReplace();
      this.colorErrors();
      this.setState({ tab: 'findErrors', selectedHeader: undefined });
    }
  }

  clickOverview() {
    if (this.state.tab !== 'overview') {
      this.props.resetFindReplace();
      this.resetColors();
      this.setState({ tab: 'overview', selectedHeader: undefined });
    }
  }

  clickFindReplace() {
    if (this.state.tab !== 'findReplace') {
      this.colorErrors();
      this.setState({ tab: 'findReplace', dialogOpen: true });
    } else {
      this.setState({ dialogOpen: true });
    }
  }

  handleCellClick(text, colName, rowInd) {
    this.setState({
      cellDialogOpen: true,
      clickedCellValues: { text, colName, rowInd }
    });
  }

  render() {
    return (
      <ModuleContainer>
        <SimpleEditDialog
          open={this.state.cellDialogOpen}
          handleClose={() => this.setState({ cellDialogOpen: false })}
          defaultText={this.state.clickedCellValues.text}
          extraValues={this.state.clickedCellValues}
          handleSave={this.props.updateCell}
        />
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
            findReplaceValues={this.props.findReplaceValues}
            columnHeaders={this.props.columnHeaders}
            saveSelectedHeader={value =>
              this.setState({ selectedHeader: value })
            }
            open={this.state.dialogOpen}
            setWrapperRef={this.setWrapperRef}
          />
        </TabContainer>
        <ButtonContainer>
          {this.props.checkedRows && (
            <ZoomButton plain onClick={() => this.props.deleteRows()}>
              Delete rows
            </ZoomButton>
          )}
        </ButtonContainer>
        <Box>
          <ErrorTable columns={this.state.columns} data={this.state.data} />
        </Box>

        <Pagination
          forcePage={this.props.forcePage}
          pageCount={this.props.pageCount}
          changePage={this.props.changePage}
        />

        <Divider />
      </ModuleContainer>
    );
  }
}

ErrorStep.propTypes = propTypes;
ErrorStep.defaultProps = defaultProps;

export default ErrorStep;
