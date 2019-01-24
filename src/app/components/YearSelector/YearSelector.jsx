/* base */
import React from 'react';
import PropTypes from 'prop-types';

/* styles */
import {
  YearLabel,
  ComponentBase,
  RangeContainer,
  CustomHandle,
} from 'components/YearSelector/YearSelector.styles';

const propTypes = {};

const defaultProps = {};

// As discussed with Siem default year period selected should be
// current year and 15 years before
const now = new Date();
const currentYear = now.getFullYear();
const yearBefore = currentYear - 15;

class YearSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 10 },
    };
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
        <YearLabel> 1968 </YearLabel>
        <RangeContainer
          min={1968}
          max={2019}
          defaultValue={[yearBefore, currentYear]}
          handle={val => this.renderHandle(val)}
          onAfterChange={val => this.props.selectYear(val)}
        />
        <YearLabel> 2019 </YearLabel>
      </ComponentBase>
    );
  }
}

YearSelector.propTypes = propTypes;
YearSelector.defaultProps = defaultProps;

export default YearSelector;
