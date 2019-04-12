/* base */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableChart from '../../../../../components/charts/tablechart/TableChart';

const ComponentBase = styled.div``;
// const propTypes = {};
// const defaultProps = {};

const TablechartFragment = props => {
  console.log(props.indicatorData);
  return (
    <ComponentBase>
      <TableChart title="H6 Headline" data={props.indicatorData} />
      {/*<CustomYearSelector*/}
      {/*selectedYear={props.selectedYear}*/}
      {/*selectYear={props.selectYear}*/}
      {/*/>*/}
    </ComponentBase>
  );
};
// TablechartFragment.propTypes = propTypes;
// TablechartFragment.defaultProps = defaultProps;
export default TablechartFragment;
