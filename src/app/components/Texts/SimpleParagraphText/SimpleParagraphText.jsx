/* base */
import React from 'react';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(({ text, ...props }) => (
  <NoSsr>
    <p {...props}>{props.children}</p>
  </NoSsr>
))`
  && {
    color: #9b9b9b;
    font-weight: 500;
    font-size: 18px;
    font-family: ${theme.font.zoomFontFamOne};
    padding: 0 100px;
    text-align: center;
  }
`;
