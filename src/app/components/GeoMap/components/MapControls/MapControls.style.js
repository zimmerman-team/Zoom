import styled from "styled-components";
import theme from "app/theme/Theme";

export const ComponentBase = styled.div`
  padding: 3px 5px;
  display: flex;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  width: 30px;
  height: 30px;
  margin: 4px 0;
  display: flex;
  border-radius: 3px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.13);
  background-color: ${theme.color.aidsFondsWhite};

  &:hover {
    cursor: pointer;
  }
`;

export const DisabledElement = styled.div`
  user-select: none;
  opacity: 0.5;
  pointer-events: none;
`;
