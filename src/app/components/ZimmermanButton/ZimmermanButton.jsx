/* base */
import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import PropTypes from 'prop-types';
import theme from 'theme/Theme';

const propTypes = {
  width: PropTypes.number,
  fontSize: PropTypes.number,
  bgColor: PropTypes.string
};

const defaultProps = {
  width: 180,
  fontSize: 14,
  bgColor: theme.color.aidsFondsRed
};

const ZimmermanButton = styled(props => (
  <NoSsr>
    <Button
      width={props.width}
      fontSize={props.fontSize}
      disableRipple
      disableFocusRipple
      {...props}
    />
  </NoSsr>
))`
  && {
    margin-top: 40px;
    background-color: ${theme.color.aidsFondsRed};
    border-radius: 15px;
    border: 0;
    color: white;
    height: 30px;
    width: ${props => `${props.width}px`};
    padding: 0 30px;
    font-family: ${theme.font.zoomFontFamTwo};
    font-size: ${props => `${props.fontSize}px`};
    text-transform: lowercase;

    &:hover {
      color: ${theme.color.aidsFondsRed};
      background-color: ${theme.color.aidsFondsWhite};
      border: 1px solid ${theme.color.aidsFondsRed};
    }
  }
`;

ZimmermanButton.propTypes = propTypes;
ZimmermanButton.defaultProps = defaultProps;

export default ZimmermanButton;
