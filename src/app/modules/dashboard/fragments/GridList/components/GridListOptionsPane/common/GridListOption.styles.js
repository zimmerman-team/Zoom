import styled from 'styled-components';
import theme from 'app/theme/Theme';

export const IconLabel = styled.label`
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 19px;
  margin-left: 3px;
`;

export const IconButton = styled.div`
  visibility: ${props => props.visibility};
  &:hover > * {
    cursor: pointer;
    color: ${theme.color.aidsFondsBlue};
  }

  &:hover path {
    fill: ${theme.color.aidsFondsBlue} !important;
  }
`;

export const SortIconButton = styled(IconButton)`
  margin-left: auto;
`;

export const RemoveButton = styled.div`
  width: 160px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.color.aidsFondsRed};
  color: ${theme.color.aidsFondsWhite};
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamTwo};
  display: flex;
  justify-content: center;
  line-height: 2;
  margin-bottom: 2px;

  &:hover {
    background-color: ${theme.color.aidsFondsBlue};
    cursor: pointer;
  }

  &:disabled {
    opacity: 20%;
  }
`;
