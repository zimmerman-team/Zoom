import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Theme from 'theme/Theme';

const ComponentBase = styled.div`
  display: flex;
  margin-bottom: 7px;

  &:last-child {
    margin-bottom: initial;
  }
`;

const GridItemTextLabel = styled.div`
  color: ${Theme.color.zoomBlack};
  font-family: ${Theme.font.zoomFontFamOne};
  font-size: 14px;
  margin-right: 3px;
  line-height: 1;
`;

const GridItemTextValue = styled.div`
  font-family: ${Theme.font.zoomFontFamTwo};
  font-size: 14px;
  line-height: 1;
`;

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
const defaultProps = {
  label: 'Label:',
  value: 'Value'
};

const GridItemText = props => {
  return (
    <ComponentBase>
      <GridItemTextLabel>{props.label}:</GridItemTextLabel>
      <GridItemTextValue> {props.value}</GridItemTextValue>
    </ComponentBase>
  );
};

GridItemText.propTypes = propTypes;
GridItemText.defaultProps = defaultProps;
export default GridItemText;
