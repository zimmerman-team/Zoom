import styled from 'styled-components';
import Theme from 'theme/Theme';

export const BarsContainer = styled.ul`
  margin: 0;
  width: 100%;
  padding-left: 10px;
`;

export const BarContainer = styled.li`
  height: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const BarName = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 30px;
  color: ${Theme.color.smallTextBlack};
  font-family: ${Theme.font.zoomFontFamTwo};
`;

export const Bar = styled.div`
  width: 50%;
  height: 18px;
  box-shadow: ${Theme.shadow.standard};
  width: ${props => props.theme.width};
  background: ${props => props.theme.color};
`;

export const Value = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-left: 10px;
  color: ${Theme.color.smallTextBlack};
  font-family: ${Theme.font.zoomFontFamTwo};
`;

export const LegendContainer = styled.div`
  display: flex;
  padding-left: 10px;
  flex-direction: column;
`;

export const Legend = styled.div`
  display: flex;
  margin-top: 20px;
  align-items: center;
  flex-direction: row;
`;

export const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  margin-right: 5px;
  background: ${props => props.theme.color};
`;

export const LegendText = styled.div`
  font-size: 12px;
  font-weight: 300;
  font-family: ${Theme.font.zoomFontFamTwo};
`;
