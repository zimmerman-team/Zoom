import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { zoomFontFamOne, zoomGreyZero } from 'components/theme/ThemeSheet';

export const FieldContainer = styled(Box)`
  margin-bottom: 20px;
`;

export const ModuleContainer = styled(Box)`
  width: 78%;
  margin: auto;
  padding-bottom: 12px;
`;

export const SelectSurround = styled(Box)`
  background-color: ${zoomGreyZero};
`;

export const SelectContainer = styled(Box)`
  width: 32%;
`;

export const DataSourceTextCont = styled(Box)`
  margin-top: auto;
  margin-bottom: 8px;
  width: 66%;
`;

export const TwoFieldContainer = styled(FieldContainer)`
  display: flex;
  flex-direction: row;
`;

export const OrLabel = styled(Text)`
  color: rgba(0, 0, 0, 0.87);
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  margin: auto 48px 6px 26px;
`;
