import styled from 'styled-components';
import { aidsFondsWhite } from 'components/theme/ThemeSheet';

export const DropDownItem = styled.div`
  padding: 5px;
  max-width: 277px;
`;

export const ComponentBase = styled.div`
  display: flex;
  background-color: ${aidsFondsWhite};
  margin: 6px 20px 6px 18px;
`;

export const ResetContainer = styled.div`
  display: flex;
  margin-left: auto;
  &:hover {
    cursor: pointer;
  }
`;
