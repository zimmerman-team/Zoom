import styled from 'styled-components';
import theme from 'theme/Theme';

export const SwitchContainer = styled.div`
  background-color: ${theme.color.zoomGreyZero};
  display: flex;
  padding-top: 9px;
`;

export const IndicatorLabel = styled.div`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 11px;
`;

export const IndLabelContainer = styled.div`
  display: flex;
  background-color: ${theme.color.zoomGreyZero};
`;

export const GreyLabel = styled.div`
  color: ${theme.color.smallTextBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${theme.fontSize.caption};
  font-weight: ${theme.weight.book};
  letter-spacing: 0.2px;
  line-height: 14.4px;
`;

export const IndicatorRemove = styled(GreyLabel)`
  margin: auto 0 auto auto;
  &:hover {
    cursor: pointer;
  }
`;

export const AddSection = styled.div`
  padding-top: 13px;
  background-color: ${theme.color.zoomGreyZero};
`;

export const AddContainer = styled.div`
  padding: 5px 5px;
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.zoomGreyOne};
    border-radius: 10px;
  }
`;

export const AddLabel = styled(GreyLabel)`
  margin: auto 0 auto 12px;
`;
