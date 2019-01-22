/* base */
import React from 'react';
import PropTypes from 'prop-types';

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
      <Stepper />
    </React.Fragment>
  );
};

DataMapperModule.propTypes = propTypes;
DataMapperModule.defaultProps = defaultProps;

export default DataMapperModule;
