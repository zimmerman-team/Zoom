import React from 'react';
import MetaDataMediator from 'mediators/DataMapperMediators/MetaDataMediator/MetaDataMediator';
/* styles */
import {
  ButtonContainer,
  ButtonLabel,
  ModuleContainer,
  ModuleContent,
  ModuleSection,
  TopModuleSection
} from './DatasetModule.style';
import { stepButStyle } from 'components/Stepper/Stepper.style';
/* components */
import ZoomButton from 'components/ZoomButton/ZoomButton';
import PropTypes from 'prop-types';
import theme from 'theme/Theme';

const propTypes = {
  dropDownData: PropTypes.shape({
    allFileSources: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            name: PropTypes.string
          })
        })
      )
    })
  }),
  saveDisabled: PropTypes.bool,
  metaDataEmptyFields: PropTypes.arrayOf(PropTypes.string),
  saveDataset: PropTypes.func
};

const defaultProps = {
  dropDownData: {},
  metaDataEmptyFields: [],
  saveDisabled: true,
  saveDataset: null
};

class DatasetModule extends React.Component {
  render() {
    return (
      <ModuleContainer>
        <TopModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{
                width: 75,
                backgroundColor: this.props.saveDisabled
                  ? theme.color.zoomGreySix
                  : '',
                ...stepButStyle
              }}
              onClick={() => this.props.saveDataset()}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </TopModuleSection>

        <ModuleContent>
          <MetaDataMediator
            dataSetEdit
            alwaysSave
            dropDownData={this.props.dropDownData}
            metaDataEmptyFields={this.props.metaDataEmptyFields}
          />
        </ModuleContent>

        <ModuleSection>
          <ButtonContainer margin="small">
            <ZoomButton
              style={{
                width: 75,
                backgroundColor: this.props.saveDisabled
                  ? theme.color.zoomGreySix
                  : '',
                ...stepButStyle
              }}
              onClick={() => this.props.saveDataset()}
            >
              <ButtonLabel>save</ButtonLabel>
            </ZoomButton>
          </ButtonContainer>
        </ModuleSection>
      </ModuleContainer>
    );
  }
}

DatasetModule.propTypes = propTypes;
DatasetModule.defaultProps = defaultProps;

export default DatasetModule;
