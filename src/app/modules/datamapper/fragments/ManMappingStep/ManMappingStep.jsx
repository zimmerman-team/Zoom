import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';

/* actions */
import * as generalActions from 'services/actions/general';

/* mock */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';

/* utils */
import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
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
  emptyFormat: PropTypes.bool,
  mapReqFields: PropTypes.arrayOf(PropTypes.string)
};
const defaultProps = {
  data: uploadInitialstate.manMapData,
  modelOptions: uploadInitialstate.modelOptions,
  emptyValue: false,
  manMapEmptyFields: false,
  emptyFormat: false,
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
                disabledValues={this.props.disabledValues}
                disabled={val.emptyFieldRow}
                search={false}
                headerStyle={{ fontSize: 12, height: 'unset' }}
                arrowMargins="auto 22px auto 4px"
                placeHolderText="-None-"
                data={this.props.modelOptions}
                valueSelected={val.zoomModelLabel}
                selectVal={zoomModel =>
                  this.selectDataType(
                    zoomModel.value,
                    val.fileType,
                    val.zoomModel,
                    zoomModel.label
                  )
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
                placeholder={this.generatePlaceholder(val)}
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
    this.changeDisabledVal = this.changeDisabledVal.bind(this);
    this.selectDataType = this.selectDataType.bind(this);
    this.generatePlaceholder = this.generatePlaceholder.bind(this);
    this.saveData = this.saveData.bind(this);
  }

  componentDidMount() {
    const data = this.props.data;

    if (!this.props.disabledValues) {
      // we ofcourse do this only initially
      // so when the component mounts we check the data for any by default selected
      // zoom models and disable them
      const selectedModels = filter(data, item => {
        return item.zoomModel !== '-None-';
      });

      selectedModels.forEach(model => {
        this.selectDataType(
          model.zoomModel,
          model.fileType,
          '-None-',
          model.zoomModelLabel
        );
      });
    }

    // so this is only needed for the coloring to activate
    this.setState({
      data
    });
  }

  componentDidUpdate() {
    this.colorMissingRows();
  }

  changeDisabledVal(value, prevVal) {
    const disabledValues = this.props.disabledValues
      ? this.props.disabledValues
      : [];

    // we disable the selected value
    const prevIndex = disabledValues.indexOf(prevVal);

    // so if a previous value is changed
    // we remove the previous value and add the new one
    if (prevIndex !== -1) {
      disabledValues.splice(prevIndex, 1);
    }

    if (value !== 'filters' && value !== '-None-')
      // and we push in the new value either way
      disabledValues.push(value);

    // logic to disable/enable relative values
    if (value === 'Number Value' || value === 'Percentage Value') {
      if (disabledValues.indexOf('Mixed Value') === -1)
        disabledValues.push('Mixed Value');
    } else if (prevVal === 'Number Value' || prevVal === 'Percentage Value') {
      // so if neither number nor percantage value is selected
      // in any other row, we can enable mixed value selection
      if (
        disabledValues.indexOf('Number Value') === -1 &&
        disabledValues.indexOf('Percentage Value') === -1
      ) {
        const mixedInd = disabledValues.indexOf('Mixed Value');
        if (mixedInd !== -1) disabledValues.splice(mixedInd, 1);
      }
    } else if (value === 'Mixed Value') {
      if (disabledValues.indexOf('Number Value') === -1)
        disabledValues.push('Number Value');

      if (disabledValues.indexOf('Percentage Value') === -1)
        disabledValues.push('Percentage Value');
    } else if (prevVal === 'Mixed Value') {
      const numbInd = disabledValues.indexOf('Number Value');
      if (numbInd !== -1) disabledValues.splice(numbInd, 1);

      const percInd = disabledValues.indexOf('Percentage Value');
      if (percInd !== -1) disabledValues.splice(percInd, 1);
    }

    return disabledValues;
  }

  generatePlaceholder(row) {
    // so we only generate placeholders
    // for emptyFieldRows to inform the user about
    // what needs to be inputed there
    if (row.emptyFieldRow)
      switch (row.zoomModel) {
        case 'indicator':
          return 'Please enter any text';
        case 'geolocation':
          return 'Please enter any country name example: "Lesotho", "Zimbabwe"';
        case 'date':
          return 'Please enter a year for your data set';
        default:
          return '';
      }

    return '';
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

  selectDataType(zoomModel, fileType, prevModel, zoomModelLabel) {
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

    // so we want some values to only be selected once
    // thust we will generate an array of disabled values using this
    const disabledValues = this.changeDisabledVal(zoomModel, prevModel);

    data[itemIndex].zoomModel = zoomModel;
    data[itemIndex].zoomModelLabel = zoomModelLabel;

    // and we save the shared manMapData
    const stepData = { ...this.props.stepData };
    stepData.manMapData = data;
    stepData.manMapDisabled = disabledValues;
    this.props.dispatch(generalActions.saveStepDataRequest(stepData));
  }

  changeLabel(label, fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ['fileType', fileType]);
    data[itemIndex].label = label;
    this.saveData(data);
  }

  lockInOut(fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ['fileType', fileType]);
    data[itemIndex].lockedIn = !data[itemIndex].lockedIn;
    this.saveData(data);
  }

  saveData(data) {
    // and we save the shared manMapData
    const stepData = { ...this.props.stepData };
    stepData.manMapData = data;
    this.props.dispatch(generalActions.saveStepDataRequest(stepData));
  }

  render() {
    return (
      <ModuleContainer>
        <ManMapTitle>Manual mapping</ManMapTitle>
        <Box>
          <ErrorLabel>
            {this.props.emptyFormat
              ? "*You have 'Mixed Value' selected as one of your files columns, you need to also select a 'value_format' column from your files columns"
              : ' '}
          </ErrorLabel>
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

const mapStateToProps = state => {
  return {
    modelOptions: state.stepData.stepzData.uploadData.modelOptions,
    data: state.stepData.stepzData.manMapData,
    disabledValues: state.stepData.stepzData.manMapDisabled,
    stepData: state.stepData.stepzData
  };
};

export default connect(mapStateToProps)(ManMappingStep);
