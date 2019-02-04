import styled from 'styled-components';
import { Box, Text } from 'grommet';
import theme from 'theme/Theme';

export const ModuleContainer = styled(Box)`
  background-color: ${theme.color.aidsFondsWhite};
  margin-bottom: 192px;
`;

export const UploadContainer = styled(Box)`
  border: 1px dashed #979797;
  width: 493px;
  height: 284px;
  margin: 25px auto 0 auto;
`;

export const IconContainer = styled(Box)`
  margin: auto;
`;

const UploadText = styled(Text)`
  color: rgba(0, 0, 0, 0.87);
  font-family: ${theme.color.zoomFontFamTwo};
  font-size: 16px;
`;

export const TextContainer = styled(UploadText)`
  margin: 0 auto 116px auto;
`;

export const EmptyInput = styled.input`
  display: none;
`;

export const BrowseLink = styled(UploadText)`
  color: ${theme.color.aidsFondsRed};
  text-decoration: underline;
  cursor: pointer;
`;

export const UploadedContainer = styled(Box)``;
