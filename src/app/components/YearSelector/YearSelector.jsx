/* base */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

/* styles */
import {
  YearLabel,
  ComponentBase,
  RangeContainer,
  CustomHandle
} from 'components/YearSelector/YearSelector.styles';

const propTypes = {};

const defaultProps = {};

class YearSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yearPeriod: [
        props.selectedYears[0],
        props.selectedYears[this.props.selectedYears.length - 1]
      ]
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.selectedYears, prevProps.selectedYears)) {
      this.setState({
        yearPeriod: [
          this.props.selectedYears[0],
          this.props.selectedYears[this.props.selectedYears.length - 1]
        ]
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
        <YearLabel> 1990 </YearLabel>
        <RangeContainer
          min={1990}
          max={2019}
          value={this.state.yearPeriod}
          handle={val => this.renderHandle(val)}
          onAfterChange={() => this.props.selectYear(this.state.yearPeriod)}
          onChange={yearPeriod => this.setState({ yearPeriod })}
        />
        <YearLabel> 2019 </YearLabel>
      </ComponentBase>
    );
  }
}

YearSelector.propTypes = propTypes;
YearSelector.defaultProps = defaultProps;

export default YearSelector;
