/* base */
import React from 'react';
import styled from 'styled-components';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NoSsr from '@material-ui/core/NoSsr';
import { zoomFontFamTwo } from 'components/theme/ThemeSheet';

export default styled(props => (
  <NoSsr>
    <FormControlLabel {...props} />
  </NoSsr>
))`
  && {
    margin: 0;
    margin-bottom: 10px;
    margin-right: 40px;
    span {
      font-family: ${zoomFontFamTwo};
      line-height: 1;
      color: black;
      font-size: 14px;
    }
  }
`;
