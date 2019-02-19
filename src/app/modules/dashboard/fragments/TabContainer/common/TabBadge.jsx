/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

const ComponentBase = styled.div`
  width: 18px;
  min-width: 18px;
  height: 18px;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  margin-right: 5px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${Theme.color.aidsFondsWhite};
  font-family: ${Theme.font.zoomFontFamOne};
  background-color: ${Theme.color.aidsFondsRed};
`;

const propTypes = {
  label: PropTypes.string
};

const defaultProps = {};

const TabBadge = props => {
  return <ComponentBase>{props.label}</ComponentBase>;
};

TabBadge.propTypes = propTypes;
TabBadge.defaultProps = defaultProps;
export default TabBadge;
