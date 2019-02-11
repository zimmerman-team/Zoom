import theme from 'theme/Theme';
import styled from 'styled-components';
import { Checkmark, Close } from 'grommet-icons';
import { Text } from 'grommet';
export const fragmentContentWidth = '1024px';

/* Buttons */
const fontSizeParagraph = '20px';

export const SimpleText = styled(Text)`
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${fontSizeParagraph};
  font-weight: 300;
  width: 100%;
  line-height: 1;
`;

/* Icons */

export const ConditionMet = styled(Checkmark)`
  fill: green;
`;
export const ConditionUnmet = styled(Close)`
  fill: ${theme.color.aidsFondsRed};
`;

export const StigmaList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

export const StigmaListItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 25%;
`;
