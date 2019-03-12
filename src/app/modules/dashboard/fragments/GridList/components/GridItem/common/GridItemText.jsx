/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

const ComponentBase = styled.div`
  display: flex;
`;

const GridItemTextLabel = styled.div`
  color: ${Theme.color.zoomBlack};
  font-family: ${Theme.font.zoomFontFamOne};
  font-size: 14px;
`;

const GridItemTextValue = styled.div`
  font-family: ${Theme.font.zoomFontFamTwo};
  font-size: 14px;
`;

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string
};
const defaultProps = {
  label: 'Label:',
  value: 'Value'
};

const GridItemText = props => {
  return (
    <ComponentBase>
      <GridItemTextLabel>{props.label}: &nbsp;</GridItemTextLabel>
      <GridItemTextValue> {props.value}</GridItemTextValue>
    </ComponentBase>
  );
};

GridItemText.propTypes = propTypes;
GridItemText.defaultProps = defaultProps;
export default GridItemText;
