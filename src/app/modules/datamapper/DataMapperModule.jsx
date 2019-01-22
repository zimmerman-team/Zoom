/* base */
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import Stepper from 'components/stepper/Stepper';

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const DataMapperModule = props => {
  return (
    <React.Fragment>
      <Box>
        <Stepper />
      </Box>
      <Box>
        // step 1 components
        <Box>// text inputfields</Box>
        <Box>// tags</Box>
        <Box>// dropdown</Box>
        <Box>// radiobuttons</Box>
        <Box>// checkboxes</Box>
        <Box>// dividers</Box>
        <Box>// labels</Box>
      </Box>
    </React.Fragment>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
