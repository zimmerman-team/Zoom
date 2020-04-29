// @ts-nocheck
/* eslint-disable */

import * as React from 'react';
import { css } from 'styled-components/macro';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RefreshIcon from '@material-ui/icons/Refresh';
import { TimelineYearItem } from 'app/components/timeline/common/TimelineYearItem';
import { yearMockData } from './yearMockData';
import { TimelineYearIndicator } from 'app/components/timeline/common/TimelineYearIndicator';

const ArrowButtonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #646464;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const TimelineContainerStyle = css`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  //width: calc(100vw - 40px);
  padding: 20px;
`;

const ItemContainerStyle = css`
  display: flex;
`;

export interface TimelineContainerParams {
  empty?: number;
}

export const TimelineContainer = (props: TimelineContainerParams) => {
  return (
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
          {/* start + end year display on timeline*/}
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

      <div
        css={`
          color: #008ed5;
          width: 100%;
          display: flex;
          justify-content: center;
          font-size: 10px;
          font-weight: 500;
          font-stretch: normal;
          font-style: normal;
          line-height: 1;
        `}
      >
        please select a year range
      </div>
      <div
        css={`
          display: flex;
          align-items: center;
          width: calc(100% - 24px);
          justify-content: flex-end;
          color: #008ed5;
          cursor: pointer;
        `}
      >
        <RefreshIcon
          css={`
            width: 15px !important;
            height: 15px !important;
          `}
        />

        <div
          css={`
            font-size: 12px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            //line-height: 0;
            letter-spacing: normal;
          `}
        >
          Reset
        </div>
      </div>
    </div>
  );
};
