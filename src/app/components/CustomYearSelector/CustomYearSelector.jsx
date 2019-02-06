import React from 'react';
import PropTypes from 'prop-types';

/* utils */
import isEqual from 'lodash/isEqual';

/* styles */
import {
  ComponentBase,
  YearLabel,
  SelectedYearLabel,
  StartControl,
  EndControl,
} from './CustomYearSelector.style';

const propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  selectedYears: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  min: 1990,
  max: 2019,
  selectedYears: ['2002', '2003', '2004', '2005', '2006', '2007', '2008'],
};

class CustomYearSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numArray: [],
      mouseDown: 'none',
      selectedYears: props.selectedYears,
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
      this.props.selectYear([
        parseInt(this.state.selectedYears[0], 10),
        parseInt(
          this.state.selectedYears[this.state.selectedYears.length - 1],
          10,
        ),
      ]);
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

    if (number === this.state.selectedYears[0])
      yearLabels = (
        <StartControl
          onMouseDown={() => this.handleMouseDown('start')}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {number}
        </StartControl>
      );
    else if (
      number === this.state.selectedYears[this.state.selectedYears.length - 1]
    )
      yearLabels = (
        <EndControl
          key={`year-${index}`}
          onMouseDown={() => this.handleMouseDown('end')}
          onMouseUp={() => this.handleMouseUp()}
        >
          {number}
        </EndControl>
      );
    else if (this.state.selectedYears.indexOf(number) !== -1)
      yearLabels = (
        <SelectedYearLabel
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {number}
        </SelectedYearLabel>
      );
    else
      yearLabels = (
        <YearLabel
          onMouseEnter={() => this.handleMouseEnter(number)}
          onMouseUp={() => this.handleMouseUp()}
          key={`year-${index}`}
        >
          {number}
        </YearLabel>
      );

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

CustomYearSelector.propTypes = propTypes;
CustomYearSelector.defaultProps = defaultProps;

export default CustomYearSelector;
