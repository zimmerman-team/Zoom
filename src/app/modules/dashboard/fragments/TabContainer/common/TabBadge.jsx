/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

const ComponentBase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  min-width: 18px;
  height: 18px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${Theme.color.aidsFondsRed};
  opacity: ${props => props.theme};
`;

const Label = styled.span`
  color: ${Theme.color.aidsFondsWhite};
  font-family: ${Theme.font.zoomFontFamOne};
  line-height: 1;
  font-size: 12px;
  font-weight: 700;
`;

const propTypes = {
  label: PropTypes.number,
  theme: PropTypes.object
};

const defaultProps = {
  label: 0
};

const TabBadge = props => {
  return (
    <ComponentBase theme={props.theme}>
      <Label>{props.label}</Label>
    </ComponentBase>
  );
};

TabBadge.propTypes = propTypes;
TabBadge.defaultProps = defaultProps;
export default TabBadge;
