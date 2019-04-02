import React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import styled from 'styled-components';
import theme from 'theme/Theme';

const TitleInput = styled.input`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 32px;
  font-weight: 400;
  line-height: 1;
  width: 100%;
  margin: 0;
  border: 0;
  text-align: center;
  margin-bottom: 5px;
  &:focus {
    outline: none;
  }
`;

const TitleEditor = props => {
  return (
    <NoSsr>
      <TitleInput type="text" {...props} />
    </NoSsr>
  );
};

export default TitleEditor;
