/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Select } from 'grommet';
import {
  DialogHeading,
  ZoomButton,
  SimpleText,
  aidsFondsWhite,
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsRed,
  aidsFondsBlue,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';

const ComponentBase = styled(Select)`
  border-radius: 0;
  background-color: ${zoomGreyZero};
  color: ${aidsFondsRed};
`;

const propTypes = {
  data: PropTypes.array,
  placeHolder: PropTypes.string,
};
const defaultProps = {
  placeHolder: 'Has no indicators',
};

const ZoomSelect = props => {
  return <Select placeholder={props.placeHolder} options={props.data} plain />;
};

ZoomSelect.propTypes = propTypes;
ZoomSelect.defaultProps = defaultProps;

export default ZoomSelect;
