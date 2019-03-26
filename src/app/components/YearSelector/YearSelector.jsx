/* base */
import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

/* consts */
import initialState from '__consts__/InitialChartDataConst';

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
          defaultValue={[
            parseInt(initialState.yearPeriod[0], 10),
            parseInt(
              initialState.yearPeriod[initialState.yearPeriod.length - 1],
              10
            )
          ]}
          handle={val => this.renderHandle(val)}
          onAfterChange={years => this.props.selectYearRange(years)}
        />
        <YearLabel> 2019 </YearLabel>
      </ComponentBase>
    );
  }
}

YearSelector.propTypes = propTypes;
YearSelector.defaultProps = defaultProps;

export default YearSelector;
