import React from 'react';
import PropTypes from 'prop-types';

/* consts */
import initialState from '__consts__/InitialChartDataConst';

/* utils */
import isEqual from 'lodash/isEqual';

/* styles */
import {
  ComponentBase,
  YearLabel,
  SelectedYearLabel,
  Text,
  StartControl,
  EndControl
} from './CustomYearSelector.style';

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedYear: PropTypes.string
};

const defaultProps = {
  min: 1990,
  max: 2019,
  selectedYear: parseInt(initialState.yearPeriod[0], 10)
};

class CustomYearSelector extends React.Component {
  state = {
    numArray: [],
    mouseDown: false,
    selectedYear: this.props.selectedYear
  };

  componentDidMount() {
    // we will use this to detect if the 'mouse dragg' has exited the component
    // we need to set the mouseDown to none then
    document.addEventListener('mouseover', this.handleMoveOutside);
    // we generate the year array here
    const numArray = [];
    for (let i = this.props.min; i < this.props.max + 1; i++) {
      numArray.push(i.toString());
    }
    this.setState({ numArray });
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.selectedYear, prevProps.selectedYear)) {
      this.setState({ selectedYear: this.props.selectedYear });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseover', this.handleMoveOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  /**
   * Alert if clicked on outside of element
   */
  handleMoveOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleMouseUp();
    }
  };

  handleMouseEnter = number => {
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

  handleClick = number => {
    this.setState({ selectedYear: number });
    this.props.selectYear(number);
  };

  formatYearLabels(number) {
    if (number == this.props.min || number == this.props.max) {
      return number;
    }
    return String(number).slice(-2);
  }

  renderYearLabels = (number, index) => {
    let yearLabels = '';

    if (this.state.selectedYear === number)
      yearLabels = (
        <SelectedYearLabel
          onMouseDown={() => this.handleMouseDown()}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          <Text>{this.formatYearLabels(number)}</Text>
        </SelectedYearLabel>
      );
    else
      yearLabels = (
        <YearLabel
          onClick={() => this.handleClick(number)}
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          <Text>{this.formatYearLabels(number)}</Text>
        </YearLabel>
      );

    return yearLabels;
  };

  render() {
    return (
      <ComponentBase ref={this.setWrapperRef}>
        {this.state.numArray.map(this.renderYearLabels)}
      </ComponentBase>
    );
  }
}

CustomYearSelector.propTypes = propTypes;
CustomYearSelector.defaultProps = defaultProps;

export default CustomYearSelector;
