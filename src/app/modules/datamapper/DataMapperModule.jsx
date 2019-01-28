/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stepper from 'components/stepper/Stepper';
import { Box } from 'grommet';
import { aidsFondsWhite } from 'components/theme/ThemeSheet';
import MetaData from 'modules/datamapper/fragments/MetaData';

const ModuleContainer = styled(Box)`
  align-items: center;
  background-color: ${aidsFondsWhite};
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <ModuleContainer>
      <Box width="1024px">
        <Box>
          <Stepper />
        </Box>
        <MetaData />
      </Box>
    </ModuleContainer>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
