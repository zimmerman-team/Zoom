/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* components */
import { Box } from 'grommet';
import FindReplace from 'modules/datamapper/fragments/ErrorsStep/components/FindReplace/FindReplace';
import Pagination from 'components/Pagination/Pagination';

/* styles */
import {
  ErrorTitle,
  ModuleContainer,
  ErrorTable,
  TabContainer,
  TabText,
  TabDivider,
} from 'modules/datamapper/fragments/ErrorsStep/ErrorStep.styles';
import { Divider } from 'components/theme/ThemeSheet';
import theme from 'theme/Theme';

/* mock */
import { columns, data, errorCells } from './ErrorsStep.mock';

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
      footnotes: PropTypes.string,
    }),
  ),
};

const defaultProps = {
  data,
};

class ErrorStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'overview',
      dialogOpen: false,
      data: props.data,
    };

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
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
    errorCells.forEach(cell => {
      document.querySelector(
        `tbody tr:nth-child(${cell.row}) td:nth-child(${cell.col})`,
      ).style.backgroundColor = theme.color.errorCellColor;
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
    return (
      <ModuleContainer>
        <ErrorTitle>Check & correct erorrs</ErrorTitle>
        <TabContainer>
          <TabText
            style={{
              color:
                this.state.tab === 'overview'
                  ? theme.color.aidsFondsBlue
                  : theme.color.aidsFondsRed,
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
                  : theme.coloraidsFondsRed,
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
                  : theme.color.aidsFondsRed,
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
          <ErrorTable columns={columns} data={this.state.data} />
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
