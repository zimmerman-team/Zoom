/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'theme/Theme';
export default styled(props => <div {...props} />)`
  color: ${props =>
    props.theme.color ? props.theme.color : theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 12px;
  line-height: 19px;
`;
