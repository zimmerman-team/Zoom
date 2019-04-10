/* base */
import React from 'react';
import PropTypes from 'prop-types';
import YearSelector from 'components/YearSelector/YearSelector';

const propTypes = {
  isYearSelect: PropTypes.bool,
  selectYearRange: PropTypes.func,
  yearRange: PropTypes.array
};

const defaultProps = {
  selectYearRange: undefined,
  yearRange: []
};

const TimePeriodPanel = props => {
  return (
    <React.Fragment>
      <YearSelector
        selectYearRange={props.selectYearRange}
        yearRange={props.yearRange}
      />
    </React.Fragment>
  );
};
TimePeriodPanel.propTypes = propTypes;
TimePeriodPanel.defaultProps = defaultProps;
export default TimePeriodPanel;
