import styled from 'styled-components';
import {
  aidsFondsWhite,
  aidsFondsRed,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';

export const ComponentBase = styled.div`
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  background-color: ${aidsFondsWhite};
  margin-top: 10px;
  padding: 10px 0;
`;

export const OptionRow = styled.div`
  font-size: 14px;
  color: ${aidsFondsRed};
  padding: 5px 10px;
  background-color: ${props => props.theme.background};

  &:hover {
    background-color: ${zoomGreyZero};
    cursor: pointer;
  }
`;
