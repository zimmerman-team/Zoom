/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { Helmet } from 'fusion-plugin-react-helmet-async';
const ComponentBase = styled.div``;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const BaseModule = props => (
  <React.Fragment>
    {/*TODO: Implement helmet*/}
    {/* <Helmet>
        <title>Base Module</title>
        <link rel="canonical" href="https://www.zimmermanzimmerman.nl/" />
      </Helmet> */}
  </React.Fragment>
);

BaseModule.propTypes = propTypes;
BaseModule.defaultProps = defaultProps;

export default BaseModule;
