import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

const StyledButton = styled(Button)`
  && {
    background: ${theme.color.aidsFondsRed};
    border-radius: 15px;
    border: 0;
    color: white;
    height: 30px;
    width: 75px;
    padding: 0 30px;
    font-family: ${theme.font.zoomFontFamTwo};
    font-size: 14px;
    text-transform: lowercase;

    &:hover {
      color: ${theme.color.aidsFondsRed};
      background-color: ${theme.color.aidsFondsWhite};
      border: 1px solid ${theme.color.aidsFondsRed};
    }
  }
`;

function ZimmermanButton() {
  return (
    <NoSsr>
      <StyledButton disableRipple>next</StyledButton>
    </NoSsr>
  );
}

export default ZimmermanButton;
