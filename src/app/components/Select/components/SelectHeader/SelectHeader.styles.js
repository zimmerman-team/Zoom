import styled from 'styled-components';
import theme from 'theme/Theme';

export const ComponentBase = styled.div`
  display: flex;
  border-radius: 0;
  font-family: ${theme.font.zoomFontFamOne};
  font-weight: normal;
  font-size: 14px;
  color: ${theme.color.aidsFondsRed};
  margin: auto auto auto 0;
  height: fit-content;
  ::-webkit-input-placeholder {
    color: ${theme.color.aidsFondsRed};
  }
  &:hover {
    cursor: pointer;
  }
  text-transform: ${props => (props.capitalize ? 'capitalize' : '')};
`;

export const PointerContainer = styled.div`
  height: fit-content;
  margin: auto 24px auto 14px;
`;

export const LabelContainer = styled.div`
  margin: auto 0;
`;

export const Span = styled.span`
  font-family: ${theme.font.zoomFontFamTwo};
`;
