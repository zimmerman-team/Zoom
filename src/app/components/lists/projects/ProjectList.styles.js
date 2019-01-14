import styled from 'styled-components';
import { Box, Heading } from 'grommet';

import {
  zoomGreyZero,
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsRed,
} from 'components/theme/ThemeSheet';

// const ComponentBase = styled.div``;

export const List = styled(Box)`
  display: flex;
  flex-direction: column;
`;
export const ListItem = styled(Box)`
  background-color: ${zoomGreyZero};
  margin-bottom: 2px;
  padding: 20px;
`;

export const PropertyContainer = styled(Box)`
  margin-bottom: 10px;
`;

export const Label = styled.div`
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  line-height: 1;
  margin-right: 4px;
`;
export const Value = styled.div`
  font-family: ${zoomFontFamTwo};
  font-size: 14px;
  line-height: 1;
`;

export const TitleContainer = styled(Heading)`
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamTwo};
  font-weight: normal;
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
  line-height: 1;
`;
export const DateContainer = styled(Box)``;
export const Separator = styled(Box)`
  font-family: ${zoomFontFamOne};
  margin-left: 4px;
  margin-right: 4px;
`;

export const SectorList = styled(Box)`
  flex-direction: row;
`;

export const SectorListItem = styled(Value)`
  &:after {
    content: ',';
    margin-right: 4px;
  }

  &:last-child {
    &:after {
      content: '';
    }
  }
`;
