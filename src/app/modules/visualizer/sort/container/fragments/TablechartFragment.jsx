/* base */
import React from 'react';
import styled from 'styled-components';

/* components */
import TableChart from '../../../../../components/charts/tablechart/TableChart';
import { FragmentBase } from '../VizContainer.style';

const TablechartFragment = props => {
  return (
    <FragmentBase>
      <TableChart
        title={props.indicatorData.title}
        data={props.indicatorData.rows}
        columns={props.indicatorData.columns}
      />
    </FragmentBase>
  );
};

export default TablechartFragment;
