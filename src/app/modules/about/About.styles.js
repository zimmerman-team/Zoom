import styled from 'styled-components';
import { Box } from 'grommet';
import { DescriptionParagraph, PageHeading } from 'components/theme/ThemeSheet';
import theme from 'theme/Theme';

export const ModuleContainer = styled(Box)`
  background-color: ${theme.color.aidsFondsWhite};
  padding: 30px 26% 80px 26%;
`;

export const AboutTitle = styled(PageHeading)`
  text-align: center;
`;

export const Text = styled(DescriptionParagraph)`
  padding: 46px 0;
`;

export const RedLink = styled.a`
  color: ${theme.color.aidsFondsRed};
`;
