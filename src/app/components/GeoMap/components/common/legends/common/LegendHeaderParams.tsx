import * as React from "react";
import "styled-components/macro";

import { LegendTitle } from "app/components/GeoMap/components/common/legends/common/LegendTitleParams";
import { LegendSwitch } from "app/components/GeoMap/components/common/legends/common/LegendSwitch";

interface LegendHeaderParams {
  title: string;
  enabled: boolean;
  changeEnabled: Function;
}

export const LegendHeader = (props: LegendHeaderParams) => {
  return (
    <div
      css={`
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        justify-content: space-between;
      `}
    >
      <LegendTitle title={props.title} />
      <LegendSwitch enabled={props.enabled} onChange={props.changeEnabled} />
    </div>
  );
};
