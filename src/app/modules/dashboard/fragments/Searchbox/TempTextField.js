/* base */
import React from 'react';
import styled from 'styled-components';
import TempTextField from '@material-ui/core/TextField';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(props => (
  <NoSsr><TempTextField {...props} /></NoSsr>
))`
  && {
    padding: 0;
    marging: 0;
  }
`;
