import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  padding: 3px 5px;
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin: 4px 0;
  width: 26px;
  height: 26px;
  border-radius: 20px;

  background-color: ${theme.color.aidsFondsWhite};
  &:hover {
    background-color: ${theme.color.zoomGreyThree};
    cursor: pointer;
  }
`;

export const DisabledElement = styled.div`
  user-select: none;
  opacity: 0.5;
  pointer-events: none;
`;
