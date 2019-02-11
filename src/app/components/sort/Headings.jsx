import styled from 'styled-components';
import theme from 'theme/Theme';

const headSizeOne = '48px';

const BaseHeading = styled.h2`
  color: ${theme.color.zoomBlack};
  font-weight: 400;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${headSizeOne};
  font-weight: 700;
  line-height: 55px;
`;

export const SectionHeading = styled(BaseHeading)`
  font-size: 32px;
  text-align: center;
  font-family: ${theme.font.zoomFontFamOne};
`;
