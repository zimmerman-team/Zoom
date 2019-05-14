/* base */
import React from 'react';
/* components */
import TableChart from 'components/charts/tablechart/TableChart';
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

const TablechartFragment = props => {
  return (
    <FragmentBase position="flex-start" paddingTop="40px">
      <TableChart
        title={props.indicatorData.title}
        data={props.indicatorData.rows}
        columns={props.indicatorData.columns}
      />
    </FragmentBase>
  );
};

export default TablechartFragment;
