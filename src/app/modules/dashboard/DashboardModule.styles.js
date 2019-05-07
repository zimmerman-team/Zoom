import theme from 'theme/Theme';
import { TextInput } from 'grommet/components/TextInput';
import styled from 'styled-components';
import { PageHeading as _PageHeading } from 'components/sort/Headings';

export const ModuleContainer = styled.div`
  padding: 0 140px;
  min-height: 96vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1024px;
  margin: 0 auto;
`;

export const Header = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Section = styled.section`
  width: 100%;
`;

export const PageHeading = styled(_PageHeading)`
  font-size: 32px;
  margin-bottom: 15px;
  line-height: 0.6;
`;

export const ModuleTitle = styled.h4`
  font-family: ${theme.font.zoomFontFamOne};
  font-weight: 400;
  color: ${theme.color.zoomBlack};
  font-size: 32px;
  line-height: 1;
  margin: 25px;
  letter-spacing: 0.5px;
`;

export const HeaderIcon = styled.div``;

export const HeaderGreeting = styled.div`
  margin: 5px 0;
  font-size: 14px;
  font-weight: 300;
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamTwo};
`;

export const SearchBox = styled(TextInput)`
  height: 48px;
  margin: 10px 0;
  font-size: 12px;
  border-radius: 0;
  border-width: 1px;
  padding-left: 35px;
  border-style: solid;
  border-color: ${theme.color.zoomGreyFour};
  // -webkit-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // -moz-box-shadow: 0px 2px 4px 0px rgba(239, 239, 239, 0.5);
  // box-shadow: 0px 2px 4px 0px rgba(220, 220, 220, 0.5);
`;

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 10px;
`;

export const NoItems = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: 700;
  padding-top: 105px;
  text-align: center;
  align-self: center;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
`;
