/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'theme/Theme';
/* components */
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';

const BaseComponent = styled(ExpansionPanelDetails)`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.zoomGreyZero};
  && {
    padding: 8px 0;
  }
`;

const propTypes = {};
const defaultProps = {};

const ExpansionPanelContent = props => {
  return <BaseComponent>{props.children}</BaseComponent>;
};
ExpansionPanelContent.propTypes = propTypes;
ExpansionPanelContent.defaultProps = defaultProps;
export default ExpansionPanelContent;
