import { Box } from 'grommet/components/Box';
import theme from 'theme/Theme';
import styled from 'styled-components';
import { BaseParagraph } from 'components/sort/Paragraphs';
import { SectionHeading } from 'components/sort/Headings';

export const fragmentContentWidth = '1024px';

export const FragmentParagraph = styled(BaseParagraph)`
  font-family: ${theme.font.zoomFontFamTwo};
  margin-top: 0;
`;

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
