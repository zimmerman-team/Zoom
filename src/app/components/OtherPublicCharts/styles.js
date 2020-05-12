import { css } from "styled-components/macro";
import Theme from "app/theme/Theme";

export const container = css`
  width: 100%;
  display: flex;
  max-width: 100%;
  overflow-x: auto;
  flex-direction: row;
  padding-bottom: 60px;

  > div:last-child {
    margin: 0 0 0 10px;
  }
  > div:first-child {
    margin: 0 10px 0 0;
  }
  > div:not(:first-child) {
    margin: 0 10px;
  }

  ::-webkit-scrollbar {
    height: 8px;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: #f0f0f0;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #2e5bff;
  }
`;

export const itemcontainer = css`
  padding: 5px;
  width: 393px;
  display: flex;
  min-width: 33%;
  flex-direction: column;
  border: 1px solid transparent;

  > a {
    text-decoration: none;
  }

  &:hover {
    cursor: pointer;
    border-color: #2e5bff;
  }
`;

export const title = css`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.44;
  color: ${Theme.color.zoomGreyTwo};
`;

export const text = css`
  font-size: 14px;
  line-height: normal;
  font-weight: normal;
  color: ${Theme.color.zoomGreyTwo};
`;
