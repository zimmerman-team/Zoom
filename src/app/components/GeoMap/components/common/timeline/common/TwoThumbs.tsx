/* eslint-disable */
/* @ts-nocheck */

import * as React from "react";
// @ts-ignore
import { Range, getTrackBackground } from "react-range";
import "styled-components/macro";
import { TimelineYearItem } from "app/components/GeoMap/components/common/timeline/common/TimelineYearItem";

const STEP = 1;
const MIN = 0;
const MAX = 100;

interface RangeSlideThumbParams {}
const RangeSlideThumb = ({ props, isDragged }) => {
  return (
    <div
      {...props}
      css={`
        height: 28px;
        width: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: red;
        border-radius: 0;
      `}
      // style={{
      //   ...props.style,
      //   height: '16px',
      //   width: '28px',
      //   borderRadius: '4px',
      //   backgroundColor: '#FFF',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // }}
    >
      <div
        style={{
          height: "16px",
          width: "5px",
          backgroundColor: isDragged ? "#548BF4" : "#CCC",
        }}
      />
    </div>
  );
};

interface RangeSliderTrack {}

const RangeSliderTrack = ({ props, children, values }) => {
  return (
    <div
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      style={{
        ...props.style,
        height: "28px",
        display: "flex",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <div
        ref={props.ref}
        style={{
          display: "flex",
          height: "28px",
          width: "100%",
          borderRadius: "0",
          background: getTrackBackground({
            values: values,
            colors: ["#ccc", "#548BF4", "#ccc"],
            min: MIN,
            max: MAX,
          }),
          alignSelf: "center",
        }}
      >
        {children}

        <div
          css={`
            position: absolute;
            display: flex;
            left: 5px;
          `}
        >
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
          <TimelineYearItem selected />
        </div>
      </div>
    </div>
  );
};

class TwoThumbs extends React.Component {
  state = {
    values: [25, 75],
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Range
          values={this.state.values}
          step={STEP}
          min={MIN}
          max={MAX}
          onChange={(values) => {
            this.setState({ values });
          }}
          renderTrack={({ props, children }) => (
            <RangeSliderTrack
              props={props}
              children={children}
              values={this.state.values}
            />
          )}
          renderThumb={({ props, isDragged }) => (
            <RangeSlideThumb props={props} isDragged={isDragged} />
          )}
        />

        {/*<output style={{ marginTop: '30px' }} id="output">*/}
        {/*  {this.state.values[0].toFixed(1)} - {this.state.values[1].toFixed(1)}*/}
        {/*</output>*/}
      </div>
    );
  }
}

export default TwoThumbs;
