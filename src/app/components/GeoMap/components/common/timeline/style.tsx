import { css } from "styled-components/macro";

export const ArrowButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #646464;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;
export const TimelineContainerStyle = css`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  //width: calc(100vw - 40px);
  padding: 20px;
`;
export const ItemContainerStyle = css`
  display: flex;
`;
export const TimeLineBottomLabelStyle = css`
  color: #008ed5;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
`;
