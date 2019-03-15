import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  visibility: ${props => props.visibility};

  &:hover > * {
    cursor: pointer;
    color: ${theme.color.aidsFondsBlue};
  }

  &:hover path {
    fill: ${theme.color.aidsFondsBlue} !important;
  }
`;

export const IconLabel = styled.label`
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 19px;
  margin-left: 3px;
`;

export const AddButton = styled.div``;
