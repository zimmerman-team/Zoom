/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import {
  Box,
  Button,
  Grommet,
  RoutedButton,
  Text,
  Heading,
  Grid,
} from 'grommet';
import { grommet } from 'grommet/themes';

import { withFontLoading } from 'fusion-plugin-font-loader-react';

const ComponentBase = styled.div``;

/* Main colors */
export const aidsFondsBlue = '#0000ff';
export const aidsFondsRed = '#ff0100';
export const aidsFondsWhite = '#ffffff';

/* Chart colors */
const chartColorOne = '#f2c987';
const chartColorTwo = '#091799';
const chartColorThree = '#CDE9EE';

/* Shades */
const zoomGreyOne = '#818181';
const zoomGreyTwo = '#505050';
const zoomBlack = '#000000';
const zoomFontFamOne = 'FFMarkProAF-Bold';
const zoomFontFamTwo = 'FFMarkProAF-Book';

const headSizeOne = '48px';
const headSizeTwo = '48px';
const fontSizeDialog = '18px';

const BaseHeading = styled.h2`
  color: ${zoomBlack};
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DialogHeading = styled(BaseHeading)`
  font-family: ${zoomFontFamOne};
  font-size: ${headSizeOne};
  text-align: center;
  margin: 0;
  padding: 0;
  line-height: 1;
`;

const PageHeading = styled(BaseHeading)`
  font-family: ${zoomFontFamOne};
  font-size: ${headSizeOne};
`;

const SectionHeading = styled(BaseHeading)`
  font-size: 32px;
  font-family: ${zoomFontFamOne};
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

export const Basictext = styled(Text)`
font-family: ${zoomFontFamOne};
font-size: ${fontSizeDialog};
color: ${zoomBlack};
width: 100%;
line-height: 1;
`;

const propTypes = {
  /** Description of prop "foo". */
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const ThemeSheet = props => {
  return (
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
      {/*<GlobalStyles/>*/}
    </React.Fragment>
  );
};

ThemeSheet.propTypes = propTypes;
ThemeSheet.defaultProps = defaultProps;

/**
 * General component description.
 */
export default ThemeSheet;
