import React from 'react';
import PropTypes from 'prop-types';

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
  ManMapTitle
} from 'modules/datamapper/fragments/ManMappingStep/ManMappingStep.style';
import CellValue from 'components/ZoomTable/CellValue';

/* mock */
import { uploadInitialstate } from '__consts__/UploadMediatorConst';

/* helpers */
import isEqual from 'lodash/isEqual';
import findIndex from 'lodash/findIndex';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      lockedIn: PropTypes.bool,
      fileType: PropTypes.string,
      zoomModel: PropTypes.string,
      label: PropTypes.string
    })
  ),
  modelOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  )
};
const defaultProps = {
  data: uploadInitialstate.manMapData,
  modelOptions: uploadInitialstate.modelOptions
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
            <CellLine> </CellLine>
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
                dropDownStyles={{ marginTop: 30 }}
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

    this.state = {
      data: props.data
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data))
      this.setState({ data: this.props.data });
  }

  selectDataType(zoomModel, fileType) {
    this.setState(prevState => {
      const { data } = prevState;
      const itemIndex = findIndex(data, ['fileType', fileType]);
      data[itemIndex].zoomModel = zoomModel;
      return { data };
    });
  }

  changeLabel(label, fileType) {
    this.setState(prevState => {
      const { data } = prevState;
      const itemIndex = findIndex(data, ['fileType', fileType]);
      data[itemIndex].label = label;
      return { data };
    });
  }

  lockInOut(fileType) {
    this.setState(prevState => {
      const { data } = prevState;
      const itemIndex = findIndex(data, ['fileType', fileType]);
      data[itemIndex].lockedIn = !data[itemIndex].lockedIn;
      return { data };
    });
  }

  render() {
    return (
      <ModuleContainer>
        <ManMapTitle>Manual mapping</ManMapTitle>
        <Box>
          <ManMapTable columns={this.columns} data={this.state.data} />
        </Box>
      </ModuleContainer>
    );
  }
}

ManMappingStep.propTypes = propTypes;
ManMappingStep.defaultProps = defaultProps;

export default ManMappingStep;
