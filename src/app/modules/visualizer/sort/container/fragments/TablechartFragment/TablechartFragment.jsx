/* base */
import React from 'react';
import { connect } from 'react-redux';

/* utils */
import isEqual from 'lodash/isEqual';

/* actions */
import * as actions from 'services/actions/general';

/* consts */
import { noData } from './TableChartFragment.const';
import initialState from '__consts__/InitialChartDataConst';

/* components */
import TableChart from 'components/charts/tablechart/TableChart';
import { FragmentBase } from 'modules/visualizer/sort/container/VizContainer.style';

class TablechartFragment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // so yeah, basically because muiTable
      // does not support column header rerendering
      // we'll have to remount the table everytime
      // data changes, so that column headers would actually update
      // and we'll use this variable for this purpose
      tableVisible: true
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !isEqual(this.props.indicatorData, nextProps.indicatorData) ||
      this.state.tableVisible !== nextState.tableVisible
    );
  }

  componentDidUpdate(prevProps) {
    // so yeah, basically because muiTable
    // does not support column header rerendering
    // we'll have to remount the table everytime
    // data changes, so that column headers would actually update
    if (!isEqual(this.props.indicatorData, prevProps.indicatorData)) {
      this.setState(
        {
          tableVisible: false
        },
        () =>
          this.setState({
            tableVisible: true
          })
      );
    }
  }

  render() {
    return (
      <FragmentBase position="flex-start" paddingTop="40px">
        {this.state.tableVisible && (
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
        )}
      </FragmentBase>
    );
  }
}

export default connect(null)(TablechartFragment);
