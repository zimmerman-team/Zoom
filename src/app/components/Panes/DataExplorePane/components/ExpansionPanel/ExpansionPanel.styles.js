import { withStyles } from '@material-ui/core';
import _ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import styled from 'styled-components';
import _ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import _ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';
import _ZoomSelect from '../../../../Select/ZoomSelect';

export const ExpansionzPanel = withStyles({
  root: {
    minHeight: '40px',
    boxShadow: '0 0 0 0 transparent',
    '&:last-child': {
      borderRadius: 0
    },
    '& > div': {
      padding: 0
    }
  }
})(_ExpansionPanel);

export const ExpansionPanelSummary = styled(_ExpansionPanelSummary)`
  & > div {
    margin: 0;
    background-color: #6c6c6c;
  }
`;

export const ComponentBase = styled.div`
  && [role='button'] {
    min-height: 40px;
    max-height: 40px;
  }
`;

export const ExpansionPanelDetails = styled(_ExpansionPanelDetails)`
  && {
    width: 100%;
    padding: 0;

    > div {
      width: 100%;
    }
  }
`;

export const ZoomSelect = styled(_ZoomSelect)`
  width: 100%;
`;
