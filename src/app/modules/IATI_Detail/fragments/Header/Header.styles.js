import styled from 'styled-components';
import { Box } from 'grommet/components/Box';
import theme from 'theme/Theme';

export const DetailList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding-top: ${props => props.paddingTop};
`;

export const DetailListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-bottom: 30px;
`;

export const ItemLabel = styled.div`
  color: #000;
  font-family: ${theme.font.zoomFontFamOne};
  line-height: 1;
  margin-bottom: 9px;
`;
export const ItemInfo = styled.div`
  font-family: ${theme.font.zoomFontFamTwo};
  color: ${theme.color.aidsFondsBlue};
  line-height: 1;
  position: relative;
`;

export const Tooltip = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  background-color: ${theme.color.aidsFondsWhite};
  padding: 20px;
  z-index: 2;
  border-radius: 2%;
  font-family: ${theme.font.zoomFontFamTwo};
  line-height: 1.3;
`;
