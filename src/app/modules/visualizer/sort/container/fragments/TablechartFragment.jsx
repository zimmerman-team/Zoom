/* base */
import React from 'react';
import styled from 'styled-components';

/* components */
import { YearContainer } from 'components/CustomYearSelector/CustomYearSelector.style';
import TableChart from '../../../../../components/charts/tablechart/TableChart';
import CustomYearSelector from '../../../../../components/CustomYearSelector/CustomYearSelector';
const ComponentBase = styled.div``;

const TablechartFragment = props => {
  return (
    <ComponentBase>
      <TableChart
        title={props.indicatorData.title}
        data={props.indicatorData.rows}
        columns={props.indicatorData.columns}
      />
      {/*<YearContainer>*/}
      {/*<CustomYearSelector*/}
      {/*selectedYear={props.selectedYear}*/}
      {/*selectYear={props.selectYear}*/}
      {/*/>*/}
      {/*</YearContainer>*/}
    </ComponentBase>
  );
};

export default TablechartFragment;
