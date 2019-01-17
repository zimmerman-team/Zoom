import styled from 'styled-components';
import {
  zoomFontFamOne,
  zoomFontFamTwo,
  zoomGreyZero,
} from 'components/theme/ThemeSheet';
import { Box } from 'grommet';

export const ComponentBase = styled.div`
  width: 320px;
  padding-top: 20px;
`;

export const FilterLabel = styled.span`
  font-family: ${zoomFontFamOne};
  font-size: 13px;
  margin-bottom: 10px;
`;

export const FilterTitle = styled.span`
  font-family: ${zoomFontFamTwo};
  font-size: 16px;
`;

export const ExplorerHeader = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`;

export const Divider = styled.div`
  height: 2px;
  background-color: ${zoomGreyZero};
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const FilterContainer = styled(Box)`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 30px;
`;
