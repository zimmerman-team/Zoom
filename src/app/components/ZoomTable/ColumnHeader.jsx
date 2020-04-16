/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'app/theme/Theme';

export default styled(props => <div {...props} />)`
  color: ${theme.color.colHeadColor};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 19px;
`;
