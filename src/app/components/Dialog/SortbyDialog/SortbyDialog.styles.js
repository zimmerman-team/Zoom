import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  background-color: ${theme.color.aidsFondsWhite};
  margin-top: 10px;
  padding: 10px 0;
  z-index: 1;
`;

export const OptionRow = styled.div`
  font-size: 14px;
  color: ${theme.color.aidsFondsRed};
  padding: 5px 10px;
  background-color: ${props => props.theme.background};

  &:hover {
    background-color: ${theme.color.zoomGreyZero};
    cursor: pointer;
  }
`;
