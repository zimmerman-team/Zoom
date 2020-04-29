import React from "react";
import PropTypes from "prop-types";
/* consts */
import initialState from "app/__consts__/InitialChartDataConst";
import { maxYear, minYear } from "app/__consts__/TimeLineConst";
/* utils */
import isEqual from "lodash/isEqual";
import { formatYearLabels } from "app/utils/YearSelectUtil";
/* styles */
import {
  ComponentBase,
  SelectedYearLabel,
  Text,
  YearLabel,
} from "./CustomYearSelector.style";

/* tmp */
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { TimelineYearItem } from "app/components/GeoMap/components/common/timeline/common/TimelineYearItem";
// import { yearMockData } from "app/components/GeoMap/components/common/timeline/yearMockData";
import { TimelineYearIndicator } from "app/components/GeoMap/components/common/timeline/common/TimelineYearIndicator";
import { ResetButton } from "app/components/GeoMap/components/common/timeline/common/ResetButton";
import {
  TimelineContainerStyle,
  ArrowButtonStyle,
  ItemContainerStyle,
  TimeLineBottomLabelStyle,
} from "app/components/GeoMap/components/common/timeline/style";

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedYear: PropTypes.string,
};

const defaultProps = {
  min: minYear,
  max: maxYear,
  selectedYear: parseInt(initialState.yearPeriod[0], 10),
};

class CustomYearSelector extends React.Component {
  state = {
    numArray: [],
    mouseDown: false,
    selectedYear: this.props.selectedYear.replace(".0", ""),
  };

  componentDidMount() {
    // we will use this to detect if the 'mouse dragg' has exited the component
    // we need to set the mouseDown to none then
    document.addEventListener("mouseover", this.handleMoveOutside);
    // we generate the year array here
    const numArray = [];
    /* todo: convert to map */
    for (let i = this.props.min; i < this.props.max + 1; i++) {
      numArray.push(i.toString());
    }
    this.setState({ numArray });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.selectedYear, prevProps.selectedYear)) {
      this.setState({
        selectedYear: this.props.selectedYear.replace(".0", ""),
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mouseover", this.handleMoveOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  handleMoveOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleMouseUp();
    }
  };

  handleMouseEnter = (number) => {
    if (this.state.mouseDown) {
      this.setState({ selectedYear: number });
    }
  };

  handleMouseDown = () => {
    this.setState({ mouseDown: true });
  };

  handleMouseUp = () => {
    if (this.state.mouseDown) {
      this.setState({ mouseDown: false });
      this.props.selectYear(this.state.selectedYear);
    }
  };

  handleClick = (number) => {
    this.setState({ selectedYear: number });
    this.props.selectYear(number);
  };

  renderYearLabels = (number, index) => {
    let yearLabels = "";

    if (this.state.selectedYear === number) {
      yearLabels = (
        <TimelineYearItem
          first
          selected
          data-cy={`year-${number}`}
          onMouseDown={() => this.handleMouseDown()}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {/* {formatYearLabels(number, this.props.min, this.props.max)} */}
          {number}
        </TimelineYearItem>
      );
    } else {
      yearLabels = (
        <TimelineYearItem
          data-cy={`year-${number}`}
          onClick={() => this.handleClick(number)}
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {number}
          {/* {formatYearLabels(number, this.props.min, this.props.max)} */}
        </TimelineYearItem>
      );
    }

    return yearLabels;
  };

  render() {
    return (
      <div css={TimelineContainerStyle}>
        <div
          css={`
            display: flex;
            align-items: center;
            margin-bottom: 10px;
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
                {this.state.numArray[0]}
              </TimelineYearIndicator>
              <TimelineYearIndicator>
                {this.state.numArray[this.state.numArray.length - 1]}
              </TimelineYearIndicator>
            </div>

            <div css={ItemContainerStyle} ref={this.setWrapperRef}>
              {this.state.numArray.map(this.renderYearLabels)}
            </div>
          </div>

          <div css={ArrowButtonStyle}>
            <ArrowForwardIosIcon />
          </div>
        </div>

        <div css={TimeLineBottomLabelStyle}>please select a year</div>
      </div>
    );
  }
}

CustomYearSelector.propTypes = propTypes;
CustomYearSelector.defaultProps = defaultProps;

export default CustomYearSelector;
