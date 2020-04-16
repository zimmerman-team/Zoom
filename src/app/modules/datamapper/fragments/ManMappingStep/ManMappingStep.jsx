/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import connect from "react-redux/es/connect/connect";
/* actions */
import * as generalActions from "app/services/actions/general";
/* mock */
import { uploadInitialstate } from "app/__consts__/UploadMediatorConst";
/* consts */
import { defModelOptions } from "app/mediators/DataMapperMediators/UploadMediator/UploadMediator.util";
import { columnValues } from "app/mediators/DataMapperMediators/WrapUpMediator/WrapUpMediator.const";
/* utils */
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import filter from "lodash/filter";
import keys from "lodash/keys";
import pickBy from "lodash/pickBy";
import { changeDisabledVal } from "./ManMappingStep.util";
/* components */
import { Box } from "grommet/components/Box";
import ZoomSelect from "app/components/Select/ZoomSelect";
/* styles */
import {
  Cell,
  CellButton,
  CellLine,
  CellTextField,
  ColHeader,
  ErrorLabel,
  ManMapTable,
  ManMapTitle,
  ModuleContainer,
  ZoomColHeader,
} from "app/modules/datamapper/fragments/ManMappingStep/ManMappingStep.style";
import CellValue from "app/components/ZoomTable/CellValue";
import theme from "app/theme/Theme";

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lockedIn: PropTypes.bool,
      fileType: PropTypes.string,
      zoomModel: PropTypes.string,
      label: PropTypes.string,
      selectDisabled: PropTypes.bool,
    })
  ),
  modelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  emptyValColFormat: PropTypes.bool,
  emptyValue: PropTypes.bool,
  manMapEmptyFields: PropTypes.bool,
  emptyFormat: PropTypes.bool,
  mapReqFields: PropTypes.arrayOf(PropTypes.string),
};
const defaultProps = {
  data: uploadInitialstate.manMapData,
  modelOptions: uploadInitialstate.modelOptions,
  emptyValColFormat: false,
  emptyValue: false,
  manMapEmptyFields: false,
  emptyFormat: false,
  mapReqFields: [],
};

class ManMappingStep extends React.Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        property: "fileType",
        header: <ColHeader>Your file</ColHeader>,
        render: (val) => (
          <Cell>
            <CellValue>{val.fileType}</CellValue>
            <CellLine />
          </Cell>
        ),
      },
      {
        property: "zoomModel",
        header: <ZoomColHeader>Zoom data model</ZoomColHeader>,
        render: (val) => (
          <Cell>
            {val.lockedIn ? (
              <CellValue>{val.zoomModel}</CellValue>
            ) : (
              <ZoomSelect
                disabledValues={this.props.disabledValues}
                disabled={val.emptyFieldRow}
                search={false}
                headerStyle={{ fontSize: 12, height: "unset" }}
                arrowMargins="auto 22px auto 4px"
                placeHolderText="-None-"
                data={this.props.modelOptions}
                valueSelected={val.zoomModelLabel}
                selectVal={(zoomModel) =>
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
        ),
      },
      {
        property: "label",
        header: <ColHeader>Extra information</ColHeader>,
        render: (val) => (
          <Cell>
            {val.lockedIn ? (
              <CellValue>{val.label}</CellValue>
            ) : (
              <CellTextField
                placeholder={this.generatePlaceholder(val)}
                disabled={
                  val.zoomModel !== "-None-" &&
                  !val.emptyFieldRow &&
                  columnValues.indexOf(val.zoomModel) === -1
                }
                defaultValue={val.label}
                onChange={(e) => this.changeLabel(e.target.value, val.fileType)}
                variant="outlined"
              />
            )}
            <CellButton onClick={() => this.lockInOut(val.fileType)}>
              {val.lockedIn ? "Edit" : "Add"}
            </CellButton>
          </Cell>
        ),
      },
    ];

    this.colorMissingRows = this.colorMissingRows.bind(this);
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
      const selectedModels = filter(data, (item) => {
        return item.zoomModel !== "-None-";
      });

      selectedModels.forEach((model) => {
        this.selectDataType(
          model.zoomModel,
          model.fileType,
          "-None-",
          model.zoomModelLabel
        );
      });
    }

    // so this is only needed for the coloring to activate
    this.setState({
      data,
    });
  }

  componentDidUpdate() {
    this.colorMissingRows();
  }

  generatePlaceholder(row) {
    if (columnValues.indexOf(row.zoomModel) !== -1) {
      return "Please enter a value format (Number, Percentage, USD$, etc.)";
    } else if (row.emptyFieldRow) {
      // so we generate placeholders
      // for emptyFieldRows to inform the user about
      // what needs to be inputed there
      switch (row.zoomModel) {
        case "indicator":
          return "Please enter any text";
        case "geolocation":
          return 'Please enter any country name example: "Lesotho", "Zimbabwe"';
        case "date":
          return "Please enter a year for your data set";
        default:
          return "";
      }
    }

    return "";
  }

  // basically colors the background of newly added rows
  // for missing fields
  colorMissingRows() {
    const { data } = this.props;
    const itemIndexes = keys(
      pickBy(data, (row) => {
        return (
          row.emptyFieldRow ||
          (this.props.emptyValColFormat &&
            columnValues.indexOf(row.zoomModel) !== -1 &&
            (!row.label || !row.lockedIn || row.label.length === 0))
        );
      })
    );

    itemIndexes.forEach((ind) => {
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
    const itemIndex = findIndex(data, ["fileType", fileType]);
    const assocItem = find(defModelOptions, ["value", zoomModel]);

    if (
      this.props.mapReqFields.indexOf(zoomModel) !== -1 ||
      (assocItem &&
        this.props.mapReqFields.indexOf(assocItem.assocModel) !== -1)
    ) {
      // so we will remove the extra rows here if a required field was selected
      // after the rows have been shown
      const extraRowInd = findIndex(data, (item) => {
        return (
          ((assocItem && assocItem.assocModel === item.zoomModel) ||
            item.zoomModel === zoomModel) &&
          item.emptyFieldRow
        );
      });

      if (extraRowInd !== -1) data.splice(extraRowInd, 1);
    }

    data[itemIndex].zoomModel = zoomModel;
    data[itemIndex].zoomModelLabel = zoomModelLabel;

    // so we want some values to only be selected once
    // thust we will generate an array of disabled values using this
    const disabledValues = changeDisabledVal(data);

    // and we save the shared manMapData
    const stepData = { ...this.props.stepData };
    stepData.manMapData = data;
    stepData.manMapDisabled = disabledValues;
    this.props.dispatch(generalActions.saveStepDataRequest(stepData));
  }

  changeLabel(label, fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ["fileType", fileType]);
    data[itemIndex].label = label;
    this.saveData(data);
  }

  lockInOut(fileType) {
    const { data } = this.props;
    const itemIndex = findIndex(data, ["fileType", fileType]);
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
              : " "}
          </ErrorLabel>
          <ErrorLabel>
            {this.props.emptyValColFormat
              ? "*Please enter a value format type for your selected column value"
              : " "}
          </ErrorLabel>
          <ErrorLabel>
            {this.props.manMapEmptyFields
              ? "*Please add values to populate the required data model\n" +
                "                fields(theyve appeared at the bottom and are marked in red) and\n" +
                '                press "Add"'
              : " "}
          </ErrorLabel>
          <ManMapTable columns={this.columns} data={this.props.data} />
        </Box>
      </ModuleContainer>
    );
  }
}

ManMappingStep.propTypes = propTypes;
ManMappingStep.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    modelOptions: state.stepData.stepzData.uploadData.modelOptions,
    data: state.stepData.stepzData.manMapData,
    disabledValues: state.stepData.stepzData.manMapDisabled,
    stepData: state.stepData.stepzData,
  };
};

export default connect(mapStateToProps)(ManMappingStep);
