import theme from 'theme/Theme';
import styled from 'styled-components';
import { Checkmark } from 'grommet-icons/icons/Checkmark';
import { Close } from 'grommet-icons/icons/Close';
import { Text } from 'grommet/components/Text';

export const fragmentContentWidth = '1024px';

/* Buttons */
const fontSizeParagraph = '20px';
const simpleTextSize = '14px';

export const SimpleText = styled(Text)`
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${fontSizeParagraph};
  font-weight: 300;
  width: 100%;
  line-height: 1;
`;

export const SimpleErrorText = styled(Text)`
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${simpleTextSize};
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
