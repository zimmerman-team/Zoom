/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'theme/Theme';
import NoSsr from '@material-ui/core/NoSsr';
import ChipInput from 'material-ui-chip-input';

export default styled(props => (
  <NoSsr>
    <ChipInput {...props} />
  </NoSsr>
))`
  && {
    & [class*='MuiInputBase-root'] {
      display: flex;
    }

    & [class*='ChipInput-chipContainer'] {
      margin-top: 20px !important;
    }

    & [class*='ChipInput-underline'] {
      &:hover:before {
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        content: '';
        position: absolute;
        transition: background-color 200ms cubic-bezier(0.4, 0, 1, 1) 0ms;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.42);
      }

      &:after {
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        content: '';
        position: absolute;
        transition: background-color 200ms cubic-bezier(0.4, 0, 1, 1) 0ms;
        pointer-events: none;
        background-color: ${theme.color.aidsFondsBlue};
      }
    }

    & [class*='ChipInput-error'] {
      &:after {
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        content: '';
        position: absolute;
        transition: background-color 200ms cubic-bezier(0.4, 0, 1, 1) 0ms;
        pointer-events: none;
        background-color: ${theme.color.aidsFondsRed};
      }
    }

    & [class*='MuiInputLabel-root'] {
      color: ${theme.color.colHeadColor};
      font-weight: 500;
      font-size: 18px;
      font-family: ${theme.font.zoomFontFamOne};
    }

    & [class*='MuiInputLabel-focused'] {
      color: ${theme.color.aidsFondsBlue};
    }

    & [class*='MuiInputLabel-error'] {
      color: ${theme.color.aidsFondsRed};
    }

    & input {
      padding-bottom: 6px;
      padding-top: 12px;
      font-family: ${theme.font.zoomFontFamTwo};
      font-size: 14px;
    }

    & div[role='button'] {
      background-color: ${theme.color.aidsFondsBlue};
      border-radius: 5px;
      & span {
        line-height: 1;
        color: ${theme.color.aidsFondsWhite};
        font-family: ${theme.color.zoomFontFamTwo};
        font-size: 14px;
        margin-right: 10px;
      }

      & svg {
        fill: white;
        fill-opacity: 0.7;
      }
    }
  }
`;
