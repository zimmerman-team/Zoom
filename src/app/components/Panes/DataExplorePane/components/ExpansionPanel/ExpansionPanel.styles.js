import theme from 'theme/Theme';
import { withStyles } from '@material-ui/core';
import styled from 'styled-components';
import _ExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import _ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';

export const ComponentBase = styled.div`
  border-bottom: 1px solid ${theme.color.zoomGreyEleven};
  && [role='button'] {
    min-height: 40px;
    max-height: 40px;
  }
`;

//TODO: Check if its possible to achieve styling on the root with styled-components
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
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 40px;

  & > div {
    margin: 0;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  &&& {
    padding-right: 0;
  }
  && svg {
    fill: ${props => props.styles.color};
  }
`;
