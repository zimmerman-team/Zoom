import styled from 'styled-components';
import theme from 'app/theme/Theme';

export const ComponentBase = styled.div`
  position: absolute;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  background-color: ${theme.color.aidsFondsWhite};
  margin-top: 10px;
  padding: 10px 0;
  z-index: 1;
  top: 20px;
  right: 0;
`;

export const OptionRow = styled.div`
  font-size: 14px;
  white-space: nowrap;
  color: ${theme.color.aidsFondsRed};
  padding: 5px 10px;
  background-color: ${props => props.theme.background};

  &:hover {
    background-color: ${theme.color.zoomGreyZero};
    cursor: pointer;
  }
`;
