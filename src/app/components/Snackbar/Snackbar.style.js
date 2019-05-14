import styled from 'styled-components';
import Snackbar from '@material-ui/core/Snackbar';
import theme from '../../theme/Theme';

export const ZimmermanSnackbar = styled(Snackbar)`
  height: 60px;
  border-radius: 5px;
  background-color: ${theme.color.snackbar};

  & [class*='MuiTypography-root'] {
    height: 60px;
    background-color: ${theme.color.snackbar};
    border-radius: 5px;
    padding: 0 15px;
    min-width: 0;
  }

  & [class*='MuiSnackbarContent-message'] {
    margin: 0 auto;
  }
`;

export const Message = styled.span`
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: ${theme.font.body2};
  font-weight: 300;
  line-height: 1;
  margin: 0 auto;
`;
