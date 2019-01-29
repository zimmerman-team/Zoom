/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Box, Button, Grommet, Text, Heading, Grid, DataTable } from 'grommet';
import { grommet } from 'grommet/themes';
import { Checkmark, Close } from 'grommet-icons';

const ComponentBase = styled.div``;

/* Main colors */
export const aidsFondsBlue = '#0000ff';
export const aidsFondsRed = '#ff0100';
export const aidsFondsWhite = '#ffffff';
export const toolTipColor = '#414141';

/* Chart colors */
export const chartColorOne = '#f2c987';
export const chartColorTwo = '#091799';
export const chartColorThree = '#CDE9EE';

/* Shades */
export const zoomGreyZero = '#efefef';
export const zoomGreyOne = '#818181';
export const zoomGreyTwo = '#505050';
export const zoomGreyThree = '#a1a1a1';
export const zoomGreyFour = '#dfdfdf';
export const zoomGreyFive = '#9b9b9b';
export const zoomGreySix = '#cecece';
export const zoomBlack = '#000000';
export const zoomFontFamOne = 'FFMarkProAF-Bold';
export const zoomFontFamTwo = 'FFMarkProAF-Book';

/* Tables */
export const colHeadColor = zoomGreyFive;
export const errorCellColor = '#ff807f';

export const ZoomTable = styled(DataTable)`
  & th {
    border: 2px solid ${zoomGreyFour};
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
      border-bottom: 2px solid ${aidsFondsWhite};
      &:last-child {
        border-color: ${zoomGreyFour};
      }
    }
    & td {
      vertical-align: top;
      border-left: 2px solid ${zoomGreyFour};
      border-right: 2px solid ${zoomGreyFour};
      &:first-child {
        border-left: 0;
      }
      &:last-child {
        border-right: 0;
      }
    }
  }

  & td {
    background-color: ${zoomGreyZero};
  }
`;

export const Divider = styled.div`
  height: 2px;
  background-color: ${zoomGreyZero};
  width: 100%;
`;

export const ColumnHeader = styled.div`
  color: ${colHeadColor};
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  line-height: 19px;
`;

export const CellValue = styled.div`
  color: ${props => (props.theme.color ? props.theme.color : zoomBlack)};
  font-family: ${zoomFontFamOne};
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
  color: ${zoomBlack};
  font-weight: 400;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const BaseParagraph = styled.p`
  color: ${zoomGreyTwo};
  font-weight: 300;
  line-height: 1.5;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DescriptionParagraph = styled.div`
  text-align: justify;
  color: ${zoomBlack};
  font-family: ${zoomFontFamTwo};
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
  font-family: ${zoomFontFamOne};
  font-size: ${headSizeOne};
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

export const PageHeading = styled(BaseHeading)`
  color: ${zoomBlack};
  font-family: ${zoomFontFamTwo};
  font-size: ${headSizeOne};
  font-weight: 700;
`;

export const SectionHeading = styled(BaseHeading)`
  font-size: 32px;
  text-align: center;
  font-family: ${zoomFontFamOne};
`;

export const PageIntroInitial = styled(BaseParagraph)`
  font-size: 20px;
  font-weight: 400;
  font-family: ${zoomFontFamOne};
  margin-top: 0;
`;

export const PageIntroSecondary = styled(BaseParagraph)`
  font-size: 20px;
  font-family: ${zoomFontFamTwo};
`;

export const FragmentParagraph = styled(BaseParagraph)`
  font-family: ${zoomFontFamTwo};
  margin-top: 0;
`;

const ColorPallete = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${aidsFondsBlue};
`;

const ColorOne = styled(ColorPallete)`
  background-color: ${aidsFondsRed};
`;

const ColorTwo = styled(ColorPallete)`
  background-color: ${aidsFondsBlue};
`;

const GreyOne = styled(ColorPallete)`
  background-color: ${zoomGreyOne};
`;

const GreyTwo = styled(ColorPallete)`
  background-color: ${zoomGreyTwo};
`;

const Black = styled(ColorPallete)`
  background-color: ${zoomBlack};
`;

/* Shadow */
const ElementShadeOne = styled.div`
  width: 150px;
  height: 150px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: ${aidsFondsWhite};
  columns: ${aidsFondsWhite};
`;

/* Buttons */
export const ZoomButton = styled(Button)`
  width: 160px;
  height: 30px;
  border-radius: 15px;
  background-color: ${aidsFondsRed};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: ${zoomFontFamTwo};
  text-transform: lowercase;
  color: ${aidsFondsWhite};
  font-weight: 300;
  line-height: 1;
`;

const ZoomButtonVariant = styled(ZoomButton)`
  background-color: ${aidsFondsBlue};
`;

export const SimpleText = styled(Text)`
  font-family: ${zoomFontFamTwo};
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
  fill: ${aidsFondsRed};
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
  font-family: ${zoomFontFamTwo};
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
  //justify-content: center;
  flex-direction: column;
  width: 25%;
`;

const propTypes = {};
const defaultProps = {};

const ThemeSheet = props => (
  <React.Fragment>
    <Grommet theme={grommet}>
      <Box align="start">
        <Heading level={2}>Color & Typography</Heading>
        <Heading level={4}>Colors</Heading>
        <Box direction="row" gap="small">
          <ColorOne />
          <ColorTwo />
        </Box>

        <Heading level={4}>Shades</Heading>
        <Box direction="row" gap="small">
          <GreyOne />
          <GreyTwo />
          <Black />
        </Box>

        <Heading level={4}>Typography</Heading>
        <DialogHeading>Page heading</DialogHeading>
        <PageHeading>Dialog heading</PageHeading>
        <SectionHeading>Section heading</SectionHeading>
        <FragmentParagraph>
          Lorem ipsum dolor simet fragment paragraph
        </FragmentParagraph>
        <DescriptionParagraph>
          Style used for paragraphish text that takes up a whole block of the
          page
        </DescriptionParagraph>
        <DescriptionParagraphBold>
          Same as above just in bold.
        </DescriptionParagraphBold>

        <Heading level={4}>Element Shadows</Heading>
        <Box direction="row" gap="medium">
          <ElementShadeOne />
        </Box>

        <Heading level={2}>Buttons</Heading>
        <Box direction="row" gap="medium">
          <ZoomButton>Label</ZoomButton>
          <ZoomButtonVariant>Label</ZoomButtonVariant>
        </Box>
        <Heading level={4}>Button shapes</Heading>
        <Heading level={4}>Button states</Heading>

        <Heading level={2}>Form & Input Fields</Heading>

        <Heading level={2}>Components</Heading>
        <Heading level={4}>Dropdowns</Heading>
      </Box>
    </Grommet>
  </React.Fragment>
);

ThemeSheet.propTypes = propTypes;
ThemeSheet.defaultProps = defaultProps;

export default ThemeSheet;
