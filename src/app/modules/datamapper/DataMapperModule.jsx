/* base */
import React from 'react';
import PropTypes from 'prop-types';
import Stepper from 'components/stepper/Stepper';
import { Box } from 'grommet';
import MetaData from 'modules/datamapper/fragments/MetaData/MetaData';

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <Box align="center">
      <Box width="1024px">
        <Stepper />
        <MetaData />
      </Box>
    </Box>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
