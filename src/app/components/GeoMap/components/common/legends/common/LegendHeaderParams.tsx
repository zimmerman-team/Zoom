import * as React from "react";
import "styled-components/macro";

import { LegendTitle } from "app/components/GeoMap/components/common/legends/common/LegendTitleParams";
import { LegendSwitch } from "app/components/GeoMap/components/common/legends/common/LegendSwitch";

interface LegendHeaderParams {
  title: string;
}

export const LegendHeader = (props: LegendHeaderParams) => {
  return (
    <div
      css={`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
      `}
    >
      <LegendTitle title={props.title} />
      <LegendSwitch />
    </div>
  );
};
