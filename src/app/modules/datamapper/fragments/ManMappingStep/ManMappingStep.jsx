import React from 'react';
import PropTypes from 'prop-types';

/* mock */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';

/* utils */
import findIndex from 'lodash/findIndex';
import keys from 'lodash/keys';
import pickBy from 'lodash/pickBy';

/* components */
import { Box } from 'grommet';
import ZoomSelect from 'components/Select/ZoomSelect';

/* styles */
import {
  Cell,
  ColHeader,
  ZoomColHeader,
  CellLine,
  CellTextField,
  CellButton,
  ModuleContainer,
  ManMapTable,
  ManMapTitle,
  ErrorLabel
} from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep.style';
import CellValue from 'components/ZoomTable/CellValue';
import theme from 'theme/Theme';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lockedIn: PropTypes.bool,
      fileType: PropTypes.string,
      zoomModel: PropTypes.string,
      label: PropTypes.string,
      selectDisabled: PropTypes.bool
    })
  ),
  modelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  emptyValue: PropTypes.bool,
  manMapEmptyFields: PropTypes.bool,
  mapReqFields: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  data: uploadInitialstate.manMapData,
  modelOptions: uploadInitialstate.modelOptions,
  emptyValue: false,
  manMapEmptyFields: false,
  mapReqFields: []
};

class ManMappingStep extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        property: 'fileType',
        header: <ColHeader>Your file</ColHeader>,
        render: val => (
          <Cell>
            <CellValue>{val.fileType}</CellValue>
            <CellLine />
          </Cell>
        )
      },
      {
        property: 'zoomModel',
        header: <ZoomColHeader>Zoom data model</ZoomColHeader>,
        render: val => (
          <Cell>
            {val.lockedIn ? (
              <CellValue>{val.zoomModel}</CellValue>
            ) : (
              <ZoomSelect
                disabled={val.emptyFieldRow}
                search={false}
                headerStyle={{ fontSize: 12, height: 'unset' }}
                arrowMargins="auto 22px auto 4px"
                placeHolder="-None-"
                data={this.props.modelOptions}
                valueSelected={val.zoomModel}
                selectVal={zoomModel =>
                  this.selectDataType(zoomModel.value, val.fileType)
                }
              />
            )}
          </Cell>
        )
      },
      {
        property: 'label',
        header: <ColHeader>Label</ColHeader>,
        render: val => (
          <Cell>
            {val.lockedIn ? (
              <CellValue>{val.label}</CellValue>
            ) : (
              <CellTextField
                disabled={val.zoomModel !== '-None-' && !val.emptyFieldRow}
                value={val.label}
                onChange={e => this.changeLabel(e.target.value, val.fileType)}
                variant="outlined"
              />
            )}
            <CellButton onClick={() => this.lockInOut(val.fileType)}>
              {val.lockedIn ? 'Edit' : 'Add'}
            </CellButton>
          </Cell>
        )
      }
    ];

    this.colorMissingRows = this.colorMissingRows.bind(this);
  }

  componentDidMount() {
    // this should not be here, we only have this here for coloring to trigger
    // but this and the coloring should be removed when we actually
    // implement the proper man mapping userflow
    this.setState({ data: this.props.data });
  }

  componentDidUpdate() {
    this.colorMissingRows();
  }

  // basically colors the background of newly added rows
  // for missing fields
  colorMissingRows() {
    const { data } = this.props;
    const itemIndexes = keys(pickBy(data, { emptyFieldRow: true }));

    itemIndexes.forEach(ind => {
      const index = parseInt(ind, 10);

      const firstCell = document.querySelector(
        `tbody tr:nth-child(${index + 1}) > th`
      );

      const secondCell = document.querySelector(
        `tbody tr:nth-child(${index + 1}) > td:nth-child(2)`
      );

      // we color the third cell
      const thirdCell = document.querySelector(
        `tbody tr:nth-child(${index + 1}) > td:nth-child(3)`
      );

      if (firstCell && secondCell && thirdCell) {
        firstCell.style.backgroundColor = theme.color.errorCellColor;
        secondCell.style.backgroundColor = theme.color.errorCellColor;
        thirdCell.style.backgroundColor = theme.color.errorCellColor;
      }
    });
  }

  selectDataType(zoomModel, fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ['fileType', fileType]);

    if (this.props.mapReqFields.indexOf(zoomModel) !== -1) {
      // so we will remove the extra rows here if a required field was selected
      // after the rows have been shown
      const extraRowInd = findIndex(data, item => {
        return item.zoomModel === zoomModel && item.emptyFieldRow;
      });

      if (extraRowInd !== -1) data.splice(extraRowInd, 1);
    }

    data[itemIndex].zoomModel = zoomModel;
    this.props.saveStepData(data, 5);
  }

  changeLabel(label, fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ['fileType', fileType]);
    data[itemIndex].label = label;
    this.props.saveStepData(data, 5);
  }

  lockInOut(fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ['fileType', fileType]);
    data[itemIndex].lockedIn = !data[itemIndex].lockedIn;
    this.props.saveStepData(data, 5);
  }

  render() {
    return (
      <ModuleContainer>
        <ManMapTitle>Manual mapping</ManMapTitle>
        <Box>
          <ErrorLabel>
            {this.props.emptyValue
              ? '*Please select at least one value for one of your columns, your csv file\n' +
                '              needs to contain some numeric or percentile values'
              : ' '}
          </ErrorLabel>
          <ErrorLabel>
            {this.props.manMapEmptyFields
              ? '*Please add values to populate the required data model\n' +
                '                fields(theyve appeared at the bottom and are marked in red) and\n' +
                '                press "Add"'
              : ' '}
          </ErrorLabel>
          <ManMapTable columns={this.columns} data={this.props.data} />
        </Box>
      </ModuleContainer>
    );
  }
}

ManMappingStep.propTypes = propTypes;
ManMappingStep.defaultProps = defaultProps;

export default ManMappingStep;
