import styled from 'styled-components';
import Theme from 'theme/Theme';

export const ComponentBase = styled.div`
  //todo: dynamisch aan de hand van grid maken..
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 39px;
  width: 285px;
  height: 168px;
  padding: 15px;
  background-color: ${Theme.color.zoomGreyZero};
  box-shadow: 0 2px 4px 2px rgba(157, 157, 157, 0.5);
`;

export const GridItemHeading = styled.div`
  font-family: ${Theme.font.zoomFontFamTwo};
  font-size: 18px;
  color: ${Theme.color.aidsFondsRed};
  margin-bottom: 10px;
`;

export const Box = styled.div``;
