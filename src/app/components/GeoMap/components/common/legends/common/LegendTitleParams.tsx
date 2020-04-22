import * as React from 'react';
import 'styled-components/macro';

interface LegendTitleParams {
  title: string;
}
export const LegendTitle = (props: LegendTitleParams) => {
  return (
    <div
      css={`
        color: rgb(74, 74, 74);
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
      `}
    >
      {props.title}
    </div>
  );
};
