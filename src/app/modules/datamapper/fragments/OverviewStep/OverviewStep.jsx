/* base */
import React from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
/* components */
import { Box } from 'grommet/components/Box';
/* consts */
import { step1InitialData } from 'app/__consts__/DataMapperStepConsts';
import Const from 'app/modules/datamapper/fragments/OverviewStep/OverviewStep.const';
/* styles */
import {
  ModuleContainer,
  OverviewTable
} from 'app/modules/datamapper/fragments/OverviewStep/OverviewStep.styles';
import { SectionHeading } from 'app/components/sort/Headings';

const propTypes = {
  stepData: PropTypes.shape({
    fileColumn: PropTypes.string,
    summary: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.any // cause it can be number or string
      })
    ),
    dataTypes: PropTypes.arrayOf(PropTypes.string),
    blankCells: PropTypes.number
  })
};
const defaultProps = {
  stepData: step1InitialData.overviewData
};

const OverviewStep = props => {
  return (
    <ModuleContainer>
      <SectionHeading>Overview</SectionHeading>
      <Box>
        <OverviewTable
          columns={Const.columns}
          data={props.stepData.overviewData}
        />
      </Box>
    </ModuleContainer>
  );
};

OverviewStep.propTypes = propTypes;
OverviewStep.defaultProps = defaultProps;

const mapStateToProps = state => {
  return {
    stepData: state.stepData.stepzData
  };
};

export default connect(mapStateToProps)(OverviewStep);
