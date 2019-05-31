/* base */
import React from 'react';
/* consts */
import { noData } from './TableChartFragment.const';

/* components */
import TableChart from 'components/charts/tablechart/TableChart';
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

const TablechartFragment = props => {
  return (
    <FragmentBase position="flex-start" paddingTop="40px">
      <TableChart
        onDownload={e => console.log(e)}
        title={props.indicatorData.title}
        data={
          props.indicatorData.rows && props.indicatorData.rows.length > 0
            ? props.indicatorData.rows
            : noData
        }
        columns={props.indicatorData.columns}
      />
    </FragmentBase>
  );
};

export default TablechartFragment;
