import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  background-color: ${theme.color.toolTipColor};
  color: ${theme.color.aidsFondsWhite}
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  padding: 5px;
`;
