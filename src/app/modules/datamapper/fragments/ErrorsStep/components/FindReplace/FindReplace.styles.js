import styled from 'styled-components';
import {
  aidsFondsWhite,
  ZoomButton,
  zoomFontFamOne,
  zoomGreyFive,
} from 'components/theme/ThemeSheet';

export const ComponentBase = styled.div`
  position: fixed;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  background-color: ${aidsFondsWhite};
  margin-left: -212px;
  margin-top: 30px;
  padding-bottom: 12px;
`;

export const FieldContainer = styled.div`
  display: flex;
  margin: 22px 22px;
`;

export const EmptyInput = styled.input`
  border: 0;
  outline: none;
  margin-top: 13px;
`;

export const InputContainer = styled.div`
  width: 150px;
  height: 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

export const InputLabelContainer = styled.div``;

export const InputLabel = styled.label`
  color: ${zoomGreyFive};
  font-family: ${zoomFontFamOne};
  font-size: 14px;
`;

export const FindReplaceButton = styled(ZoomButton)`
  width: 98px;
  height: 30px;
  font-size: 14px;
  font-family: ${zoomFontFamOne};
  text-transform: capitalize;
  margin-top: auto;
  margin-left: 28px;
`;