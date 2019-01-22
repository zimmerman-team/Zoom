import styled from 'styled-components';
import './YearSelector.scss';
import { Range } from 'rc-slider';
import {
  zoomBlack,
  zoomFontFamOne,
  aidsFondsRed,
  aidsFondsWhite,
} from 'components/theme/ThemeSheet';

export const YearLabel = styled.div`
  color: ${zoomBlack};
  font-family: ${zoomFontFamOne};
  font-size: 12px;
  line-height: 24px;
  height: fit-content;
  margin: auto 4px 24px 4px;
`;

export const ComponentBase = styled.div`
  display: flex;
  padding: 0 10px;
  height: 57px;
`;

export const RangeContainer = styled(Range)`
  margin: auto;
`;

export const CustomHandle = styled.div`
  position: absolute;
  margin-left: -12px;
  margin-top: -10px;
  width: 24px;
  height: 25px;
  cursor: pointer;
  cursor: -webkit-grab;
  cursor: grab;
  border-radius: 50%;
  border: solid 2px ${aidsFondsRed};
  background-color: ${aidsFondsRed};
  text-align: center;
  -ms-touch-action: pan-x;
  touch-action: pan-x;
  color: ${aidsFondsWhite};
  font-size: 12px;
  font-family: ${zoomFontFamOne};
  &:focus {
    border-color: #57c5f7;
    box-shadow: 0 0 0 5px #96dbfa;
    outline: none;
  }
  &:hover {
    border-color: #57c5f7;
    box-shadow: 0 0 0 5px #96dbfa;
    outline: none;
  }
  &:hover {
    border-color: #57c5f7;
  }
  &:active {
    border-color: #57c5f7;
    box-shadow: 0 0 5px #57c5f7;
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`;