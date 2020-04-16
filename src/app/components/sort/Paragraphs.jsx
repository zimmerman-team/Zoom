import theme from 'app/theme/Theme';
import styled from 'styled-components';

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

export const BaseParagraph = styled.p`
  color: ${theme.color.zoomGreyTwo};
  font-weight: 300;
  line-height: 1.5;
  font-size: 20px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

export const DescriptionParagraphBoldIt = styled(DescriptionParagraph)`
  font-style: italic;
  font-weight: 700;
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
