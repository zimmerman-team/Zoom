/* base */
import React from 'react';
import styled from 'styled-components';
import { DataTable } from 'grommet';
import NoSsr from '@material-ui/core/NoSsr';
import theme from 'theme/Theme';

export default styled(props => (
  <NoSsr>
    <DataTable {...props} />
  </NoSsr>
))`
  && {
    & th {
      border: 2px solid ${theme.color.zoomGreyNine};
      border-bottom: 0;
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
      > div {
        border-bottom: 0;
      }
    }

    & tbody {
      & tr {
        border-bottom: 2px solid ${theme.color.aidsFondsWhite};
        &:first-child {
          & th {
            border-top: none;
          }
        }
        &:last-child {
          border-color: ${theme.color.zoomGreyNine};
        }
      }
      & td {
        vertical-align: top;
        border-left: 2px solid ${theme.color.zoomGreyNine};
        border-right: 2px solid ${theme.color.zoomGreyNine};
        &:first-child {
          border-left: 0;
        }
        &:last-child {
          border-right: 0;
        }
      }
      & th {
        background-color: ${theme.color.zoomGreyZero};
        border-top: 2px solid ${theme.color.aidsFondsWhite};
      }
    }

    & td {
      background-color: ${theme.color.zoomGreyZero};
    }
  }
`;
