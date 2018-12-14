/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  FragmentContainer,
  FragmentContent,
} from 'components/theme/ThemeSheet';

const propTypes = {};
const defaultProps = {};

const ModuleFragment = ({ children, background }) => (
  <FragmentContainer background={background}>
    <FragmentContent>{children}</FragmentContent>
  </FragmentContainer>
);

ModuleFragment.propTypes = propTypes;
ModuleFragment.defaultProps = defaultProps;

export default ModuleFragment;
