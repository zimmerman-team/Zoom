import * as React from "react";
import "styled-components/macro";
import {
  container,
  itemcontainer,
  title,
  text,
} from "app/components/OtherPublicCharts/styles";
import { getPublicChartImage } from "app/components/OtherPublicCharts/utils";
import { formPath } from "app/modules/dashboard/fragments/GridList/components/GridItem/GridItem.util";

export const OtherPublicCharts = (props) => {
  return (
    <div css={container}>
      {props.data.map((item) => (
        <div
          key={item.id}
          css={itemcontainer}
          onClick={() => {
            // props.clearPrevChartData();
            // setTimeout(() => {
            props.outerHistory.push(
              formPath(null, null, item.id, item.info["Type of chart"])
            );
            props.innerHistory.replace(
              formPath(null, null, item.id, item.info["Type of chart"])
            );
            // }, 200);
          }}
        >
          <div css={title}>{item.title}</div>
          <div
            css={`
              width: 100%;
              height: 57px;
            `}
          />
          <img
            src={getPublicChartImage(item.info["Type of chart"])}
            width="100%"
            height="130px"
          />
          <div
            css={`
              width: 100%;
              height: 25px;
            `}
          />
          <div css={text}>{item.descIntro}</div>
        </div>
      ))}
    </div>
  );
};
