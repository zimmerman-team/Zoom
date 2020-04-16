/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'app/theme/Theme';

export default styled(props => <div {...props} />)`
  height: 2px;
  background-color: ${theme.color.zoomGreyZero};
  width: 100%;
`;
