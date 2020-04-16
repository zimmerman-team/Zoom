import React from 'react';
import PropTypes from 'prop-types';
/* consts */
import { maxYear, minYear } from 'app/__consts__/TimeLineConst';
/* utils */
import isEqual from 'lodash/isEqual';
import { formatYearLabels } from 'app/utils/YearSelectUtil';
/* styles */
import {
  ComponentBase,
  EndControl,
  SelectedYearLabel,
  StartControl,
  YearLabel
} from './YearRangeSelector.style';

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectYearRange: PropTypes.func,
  selectedYears: PropTypes.arrayOf(PropTypes.string)
};

const defaultProps = {
  min: minYear,
  max: maxYear,
  selectYearRange: null,
  selectedYears: ['2002', '2003', '2004', '2005', '2006', '2007', '2008']
};

class YearRangeSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numArray: [],
      mouseDown: 'none',
      selectedYears: props.selectedYears
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.renderYearLabels = this.renderYearLabels.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleMoveOutside = this.handleMoveOutside.bind(this);
  }

  componentDidMount() {
    // we will use this to detect if the 'mouse dragg' has exited the component
    // we need to set the mouseDown to none then
    document.addEventListener('mouseover', this.handleMoveOutside);
    // we generate the year array here
    const numArray = [];

    /* todo: convert to map */
    for (let i = this.props.min; i < this.props.max + 1; i++) {
      numArray.push(i.toString());
    }
    this.setState({ numArray });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.selectedYears, prevProps.selectedYears)) {
      this.setState({ selectedYears: this.props.selectedYears });
    }

    if (
      this.state.mouseDown !== prevState.mouseDown &&
      this.state.mouseDown === 'none'
    ) {
      this.props.selectYearRange(this.state.selectedYears);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseover', this.handleMoveOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleMoveOutside(event) {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target) &&
      this.state.mouseDown !== 'none'
    ) {
      this.setState({ mouseDown: 'none' });
    }
  }

  handleMouseEnter(number) {
    if (this.state.mouseDown !== 'none') {
      this.setState(prevState => {
        const selectedYears = [...prevState.selectedYears];

        const numberInt = parseInt(number, 10);
        const startInt = parseInt(selectedYears[0], 10);
        const endInt = parseInt(selectedYears[selectedYears.length - 1], 10);

        // so we basically use this weird if because mouse enter event doesn't triggger
        // when you hover very quickly, so this basically disables your drag if you
        // try to drag the control too quickly.
        if (
          (numberInt < startInt && startInt - 1 !== numberInt) ||
          (numberInt > endInt && endInt + 1 !== numberInt) ||
          (numberInt > startInt &&
            numberInt < endInt &&
            ((prevState.mouseDown === 'start' && startInt + 1 !== numberInt) ||
              (prevState.mouseDown === 'end' && endInt - 1 !== numberInt)))
        ) {
          return { mouseDown: 'none' };
        }

        const yearInd = selectedYears.indexOf(number);
        if (yearInd !== -1) {
          if (selectedYears[1] === number) selectedYears.splice(yearInd - 1, 1);
          else selectedYears.splice(yearInd + 1, 1);
        } else if (numberInt < startInt) selectedYears.unshift(number);
        else selectedYears.push(number);
        return { selectedYears };
      });
    }
  }

  handleMouseDown(mouseDown) {
    this.setState({ mouseDown });
  }

  handleMouseUp() {
    this.setState({ mouseDown: 'none' });
  }

  renderYearLabels(number, index) {
    let yearLabels = '';

    const { min, max } = this.props;

    if (number === this.state.selectedYears[0]) {
      yearLabels = (
        <StartControl
          onMouseDown={() => this.handleMouseDown('start')}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {formatYearLabels(number, min, max)}
        </StartControl>
      );
    } else if (
      number === this.state.selectedYears[this.state.selectedYears.length - 1]
    ) {
      yearLabels = (
        <EndControl
          key={`year-${index}`}
          onMouseDown={() => this.handleMouseDown('end')}
          onMouseUp={() => this.handleMouseUp()}
        >
          {formatYearLabels(number, min, max)}
        </EndControl>
      );
    } else if (this.state.selectedYears.indexOf(number) !== -1) {
      yearLabels = (
        <SelectedYearLabel
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {formatYearLabels(number, min, max)}
        </SelectedYearLabel>
      );
    } else {
      yearLabels = (
        <YearLabel
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {formatYearLabels(number, min, max)}
        </YearLabel>
      );
    }

    return yearLabels;
  }

  render() {
    return (
      <ComponentBase ref={this.setWrapperRef}>
        {this.state.numArray.map(this.renderYearLabels)}
      </ComponentBase>
    );
  }
}

YearRangeSelector.propTypes = propTypes;
YearRangeSelector.defaultProps = defaultProps;

export default YearRangeSelector;
