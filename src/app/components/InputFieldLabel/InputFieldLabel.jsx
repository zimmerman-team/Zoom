/* base */
import React from 'react';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { Text } from 'grommet/components/Text';
import theme from 'theme/Theme';

export default styled(({ text, ...props }) => (
  <NoSsr>
    <Text {...props}>{text}</Text>
  </NoSsr>
))`
  && {
    color: #9b9b9b;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 14px;
    font-family: ${theme.font.zoomFontFamOne};
  }
`;
