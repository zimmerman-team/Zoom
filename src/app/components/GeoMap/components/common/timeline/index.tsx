import * as React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { TimelineYearItem } from "app/components/GeoMap/components/common/timeline/common/TimelineYearItem";
import { yearMockData } from "./yearMockData";
import { TimelineYearIndicator } from "app/components/GeoMap/components/common/timeline/common/TimelineYearIndicator";
import { ResetButton } from "./common/ResetButton";
import {
  TimelineContainerStyle,
  ArrowButtonStyle,
  ItemContainerStyle,
  TimeLineBottomLabelStyle,
} from "./style";
import { YearContainer } from "app/components/CustomYearSelector/CustomYearSelector.style";
import Theme from "app/theme/Theme";
import YearRangeSelector from "app/components/YearRangeSelector/YearRangeSelector";

export interface TimelineContainerParams {
  empty?: number;
}

export const TimelineContainer = (props: TimelineContainerParams) => {
  const [selectedYears, setSelectedYears] = React.useState([
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
  ]);

  return (
    <>
      <YearContainer
        bottom="24px"
        backgroundColor={Theme.color.aidsFondsGreyOpacity}
      >
        <YearRangeSelector
          selectYearRange={setSelectedYears}
          selectedYears={selectedYears}
        />
      </YearContainer>
      <div css={TimelineContainerStyle}>
        <div
          css={`
            display: flex;
            align-items: center;
            margin-bottom: 5px;
          `}
        >
          <div css={ArrowButtonStyle}>
            <ArrowBackIosIcon />
          </div>
          <div
            css={`
              position: relative;
              margin-left: 5px;
              margin-right: 5px;
            `}
          >
            <div
              css={`
                display: flex;
                justify-content: space-between;
                position: absolute;
                width: 100%;
                top: -12px;
              `}
            >
              <TimelineYearIndicator>
                {yearMockData[0].year}
              </TimelineYearIndicator>
              <TimelineYearIndicator>
                {yearMockData[yearMockData.length - 1].year}
              </TimelineYearIndicator>
            </div>

            <div css={ItemContainerStyle}>
              {yearMockData.map((yearData) => (
                <TimelineYearItem key={yearData.year} {...yearData} />
              ))}
            </div>
          </div>

          <div css={ArrowButtonStyle}>
            <ArrowForwardIosIcon />
          </div>
        </div>

        <div css={TimeLineBottomLabelStyle}>please select a year range</div>
        <ResetButton />
      </div>
    </>
  );
};
