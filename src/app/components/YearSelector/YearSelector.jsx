/* base */
import React from 'react';
import isEqual from 'lodash/isEqual';
/* consts */
import { maxYear, minYear } from '__consts__/TimeLineConst';
/* styles */
import {
  ComponentBase,
  CustomHandle,
  RangeContainer,
  YearLabel
} from 'components/YearSelector/YearSelector.styles';

const propTypes = {};

const defaultProps = {};

class YearSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yearPeriod: props.yearRange
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.yearRange, prevProps.yearRange)) {
      this.setState({
        yearPeriod: this.props.yearRange
      });
    }
  }

  lastTwoDigits(value) {
    const string = value.toString();
    const numbArray = string.split('');
    return numbArray.length > 1
      ? numbArray[numbArray.length - 2].concat(numbArray[numbArray.length - 1])
      : 'N/A';
  }

  renderHandle(value) {
    return (
      <CustomHandle style={{ left: `${value.offset}%` }} key={value.index}>
        {this.lastTwoDigits(value.value)}
      </CustomHandle>
    );
  }

  render() {
    return (
      <ComponentBase>
        <YearLabel> {minYear} </YearLabel>
        <RangeContainer
          min={minYear}
          max={maxYear}
          value={this.state.yearPeriod}
          handle={val => this.renderHandle(val)}
          onAfterChange={() =>
            this.props.selectYearRange(this.state.yearPeriod)
          }
          onChange={yearPeriod => this.setState({ yearPeriod })}
        />
        <YearLabel> {maxYear} </YearLabel>
      </ComponentBase>
    );
  }
}

YearSelector.propTypes = propTypes;
YearSelector.defaultProps = defaultProps;

export default YearSelector;
