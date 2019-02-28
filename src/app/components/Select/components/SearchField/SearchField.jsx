/* base */
import React from 'react';
import styled from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';
import TextField from '@material-ui/core/TextField';

export default styled(props => (
  <NoSsr>
    <TextField
      data-cy="geo-map-search"
      placeholder="Search"
      InputProps={{
        disableUnderline: true,
      }}
      {...props}
    />
  </NoSsr>
))`
  && {
    width: 88%;
    height: 40px;
    margin: 8px auto 6px auto;
    background-color: ${theme.color.zoomGreyZero};

    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);

    > div {
      > input {
        margin-top: 4px;
        padding: 6px 12px;
        &::-webkit-input-placeholder {
          /* Chrome/Opera/Safari */
          color: ${theme.color.zoomBlack};
          opacity: 1;
          font-family: ${theme.font.zoomFontFamTwo};
          font-size: 12px;
        }
        &::-moz-placeholder {
          /* Firefox 19+ */
          color: ${theme.color.zoomBlack};
          opacity: 1;
          font-family: ${theme.font.zoomFontFamTwo};
          font-size: 12px;
        }
        &:-ms-input-placeholder {
          /* IE 10+ */
          color: ${theme.color.zoomBlack};
          opacity: 1;
          font-family: ${theme.font.zoomFontFamTwo};
          font-size: 12px;
        }
        &:-moz-placeholder {
          /* Firefox 18- */
          color: ${theme.color.zoomBlack};
          opacity: 1;
          font-family: ${theme.font.zoomFontFamTwo};
          font-size: 12px;
        }
      }
    }
  }
`;
