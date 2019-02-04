/* base */
import React from 'react';

import styled from 'styled-components';
import { Box, Button, Grommet, Text, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { Checkmark, Close } from 'grommet-icons';
import theme from 'theme/Theme';

/* Tables */

export const errorCellColor = '#ff807f';

export const ZoomTable = styled(DataTable)`
  & th {
    border: 2px solid ${theme.color.zoomGreyFour};
    border-bottom: 0;
    &:first-child {
      border-left: 0;
    }
    &:last-child {
      border-right: 0;
    }
    > div {
      border-bottom: 0;
    }
  }

  & tbody {
    & tr {
      border-bottom: 2px solid ${theme.color.aidsFondsWhite};
      &:first-child {
        & th {
          border-top: none;
        }
      }
      &:last-child {
        border-color: ${theme.color.zoomGreyFour};
      }
    }
    & td {
      vertical-align: top;
      border-left: 2px solid ${theme.color.zoomGreyFour};
      border-right: 2px solid ${theme.color.zoomGreyFour};
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
    & th {
      background-color: ${theme.color.zoomGreyZero};
      border-top: 2px solid ${theme.color.aidsFondsWhite};
    }
  }

  & td {
    background-color: ${theme.color.zoomGreyZero};
  }
`;

export const Divider = styled.div`
  height: 2px;
  background-color: ${theme.color.zoomGreyZero};
  width: 100%;
`;

export const ColumnHeader = styled.div`
  color: ${theme.color.colHeadColor};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  line-height: 19px;
`;

export const CellValue = styled.div`
  color: ${props =>
    props.theme.color ? props.theme.color : theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 12px;
  line-height: 19px;
`;

/* Tables End */

const headSizeOne = '48px';
const headSizeTwo = '48px';
const fontSizeDialog = '18px';
const fontSizeParagraph = '20px';
const bigSpace = '40px';
const smallSpace = '20px';

export const fragmentContentWidth = '1024px';

const BaseHeading = styled.h2`
  color: ${theme.color.zoomBlack};
  font-weight: 400;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const BaseParagraph = styled.p`
  color: ${theme.color.zoomGreyTwo};
  font-weight: 300;
  line-height: 1.5;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DescriptionParagraph = styled.div`
  text-align: justify;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-weight: 300;
  line-height: 33px;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DescriptionParagraphBold = styled(DescriptionParagraph)`
  font-weight: 700;
`;

export const DialogHeading = styled(BaseHeading)`
  font-family: ${theme.font.zoomFontFamOne};
  font-size: ${headSizeOne};
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

export const PageHeading = styled(BaseHeading)`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.color.zoomFontFamTwo};
  font-size: ${headSizeOne};
  font-weight: 700;
`;

export const SectionHeading = styled(BaseHeading)`
  font-size: 32px;
  text-align: center;
  font-family: ${theme.color.zoomFontFamOne};
`;

export const PageIntroInitial = styled(BaseParagraph)`
  font-size: 20px;
  font-weight: 400;
  font-family: ${theme.font.zoomFontFamOne};
  margin-top: 0;
`;

export const PageIntroSecondary = styled(BaseParagraph)`
  font-size: 20px;
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const FragmentParagraph = styled(BaseParagraph)`
  font-family: ${theme.font.zoomFontFamTwo};
  margin-top: 0;
`;

/* Buttons */
export const ZoomButton = styled(Button)`
  width: 160px;
  height: 30px;
  border-radius: 15px;
  background-color: ${theme.color.aidsFondsRed};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: ${theme.font.zoomFontFamTwo};
  text-transform: lowercase;
  color: ${theme.color.aidsFondsWhite};
  font-weight: 300;
  line-height: 1;
`;

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

/* modfule fragments */

export const FragmentContainer = styled(Box)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
`;

export const FragmentContent = styled(Box)`
  width: 100%;
  max-width: ${fragmentContentWidth};
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const FragmentHeader = styled(SectionHeading)`
  margin-top: 0;
  margin-bottom: 50px;
`;
export const FragmentDescription = styled(FragmentParagraph)`
  max-width: 900px;
  align-self: flex-start;
`;
export const FragmentVisualisation = styled(Box)`
  align-items: center;
  justify-content: center;
  width: 100%;
  font-family: ${theme.font.zoomFontFamTwo};
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

const propTypes = {};
const defaultProps = {};

const ThemeSheet = props => (
  <React.Fragment>
    <Grommet theme={grommet}>
      <Box align="start" />
    </Grommet>
  </React.Fragment>
);

ThemeSheet.propTypes = propTypes;
ThemeSheet.defaultProps = defaultProps;

export default ThemeSheet;
