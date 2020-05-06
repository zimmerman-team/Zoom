import * as React from "react";
import "styled-components/macro";
import theme from "app/theme/Theme";

interface LegendTitleParams {
  title: string;
}
export const LegendTitle = (props: LegendTitleParams) => {
  const [showMore, setShowMore] = React.useState(false);
  const titleSplits = props.title.split(",");
  return (
    <div
      css={`
        color: rgb(74, 74, 74);
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 0;
      `}
    >
      {titleSplits.length > 5 ? titleSplits.slice(0, 5).join(",") : props.title}
      {showMore && titleSplits.slice(5).join(",")}
      {titleSplits.length > 5 && !showMore && "..."}
      {titleSplits.length > 5 && (
        <span
          onClick={() => setShowMore(!showMore)}
          css={`
            color: ${theme.color.aidsFondsRed};
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          `}
        >
          {" "}
          (show {showMore ? "less" : "more"})
        </span>
      )}
    </div>
  );
};
