import styled from 'styled-components';
import theme from 'theme/Theme';
export const DropDownItem = styled.li`
  padding: 6px 16px;
  width: 250px;
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: ${theme.color.zoomGreyZero};
  }
  &:first-child {
    padding-top: 12px;
  }
  &:last-child {
    padding-bottom: 12px;
  }
`;

export const DropDownLabel = styled.div`
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamOne};
  font-size: 14px;
  margin: auto 0;
`;

export const ComponentBase = styled.div`
  display: flex;
  min-height: 41px;
  & button {
    border-style: none !important;
  }
`;

export const ResetContainer = styled.div`
  display: flex;
  height: fit-content;
  margin: auto 6px auto auto;
  &:hover {
    cursor: pointer;
  }
`;

export const DropDownContainer = styled.ul`
  position: absolute;
  background-color: ${theme.color.aidsFondsWhite};
  margin-top: 44px;
  z-index: 1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
  padding: 0;
`;

export const OptionsContainer = styled.ul`
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 36vh;

  /* width */
  ::-webkit-scrollbar {
    width: 6px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${theme.color.zoomGreyEight};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SelectAll = styled(DropDownItem)`
  border-bottom: 1px solid ${theme.color.zoomGreySeven};
  padding-bottom: 12px;
`;

export const CategoryItem = styled(DropDownItem)`
  border-bottom: 1px solid ${theme.color.zoomGreySeven};
  &:hover {
    cursor: unset;
    background-color: inherit;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
`;

export const InfoLabel = styled.div`
  color: ${theme.color.zoomYellow};
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamOne};
  line-height: 21px;
  width: 88%;
  margin: 8px auto 0 auto;
`;

export const EmptyOptions = styled(DropDownItem)`
  color: ${theme.color.zoomGreyThree};
  font-size: 14px;
  font-family: ${theme.font.zoomFontFamTwo};

  &:hover {
    cursor: unset;
    background-color: unset;
  }
`;
