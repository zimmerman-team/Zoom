/* base */
import React from 'react';
/* utils */
import isEqual from 'lodash/isEqual';

/* consts */
import { noData } from './TableChartFragment.const';

/* components */
import TableChart from 'components/charts/tablechart/TableChart';
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

class TablechartFragment extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.indicatorData, nextProps.indicatorData);
  }

  render() {
    return (
      <FragmentBase position="flex-start" paddingTop="40px">
        <TableChart
          onDownload={e => console.log(e)}
          title={this.props.indicatorData.title}
          data={
            this.props.indicatorData.rows &&
            this.props.indicatorData.rows.length > 0
              ? this.props.indicatorData.rows
              : noData
          }
          columns={this.props.indicatorData.columns}
        />
      </FragmentBase>
    );
  }
}

export default TablechartFragment;
