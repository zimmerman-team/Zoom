import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import NoSsr from '@material-ui/core/NoSsr';
import { zoomFontFamTwo } from 'components/theme/ThemeSheet';

const Component = styled(Radio)``;

function ZimmermanRadioButton() {
  return (
    <NoSsr>
      <Component
        id="standard-full-width"
        fullWidth
        disableRipple
        margin="none"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </NoSsr>
  );
}

export default ZimmermanRadioButton;
