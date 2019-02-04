import styled from 'styled-components';
import {
  zoomFontFamOne,
  aidsFondsRed,
  aidsFondsWhite,
  zoomGreyZero,
  zoomGreyEight,
  zoomGreySeven,
} from 'components/theme/ThemeSheet';

export const DropDownItem = styled.li`
  padding: 6px 16px;
  width: 250px;
  display: flex;
  &:hover {
    cursor: pointer;
    background-color: ${zoomGreyZero};
  }
  &:first-child {
    padding-top: 12px;
  }
  &:last-child {
    padding-bottom: 12px;
  }
`;

export const DropDownLabel = styled.div`
  color: ${aidsFondsRed};
  font-family: ${zoomFontFamOne};
  font-size: 14px;
  margin: auto 0;
`;

export const ComponentBase = styled.div`
  display: flex;
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
  background-color: ${aidsFondsWhite};
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
    background: ${zoomGreyEight};
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const SelectAll = styled(DropDownItem)`
  border-bottom: 1px solid ${zoomGreySeven};
  padding-bottom: 12px;
`;

export const categoryStyle = {
  borderBottom: `1px solid ${zoomGreySeven}`,
};
