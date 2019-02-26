import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* consts */
import {
  startItems,
  createChartItems,
  convertDataItems
} from './NavPane.const';
import paneTypes from '__consts__/PaneTypesConst';

/* icons */
import SvgIconPointer from 'assets/icons/IconPointer';

/* styles */
import {
  NavPaneItem,
  ComponentBase,
  ItemLabel,
  ItemIcon
} from './NavPane.style';
import * as actions from 'services/actions/general';

class NavPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pane: props.dataPaneOpen
    };

    this.renderPaneItems = this.renderPaneItems.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataPaneOpen !== prevProps.dataPaneOpen)
      this.setState({ pane: this.props.dataPaneOpen });
  }

  renderPaneItems() {
    if (this.state.pane === paneTypes.privPane)
      return startItems.map(item => {
        return (
          <NavPaneItem
            key={item.label}
            to="#"
            onClick={() =>
              this.props.dispatch(actions.dataPaneToggleRequest(item.navTo))
            }
          >
            <ItemIcon>
              <SvgIconPointer />
            </ItemIcon>
            <ItemLabel>{item.label}</ItemLabel>
          </NavPaneItem>
        );
      });

    const data =
      this.state.pane === paneTypes.createChart
        ? createChartItems
        : convertDataItems;

    return data.map(item => {
      return (
        <NavPaneItem to={item.navTo} key={item.label}>
          <ItemIcon>
            <SvgIconPointer />
          </ItemIcon>
          <ItemLabel>{item.label}</ItemLabel>
        </NavPaneItem>
      );
    });
  }

  render() {
    return <ComponentBase>{this.renderPaneItems()}</ComponentBase>;
  }
}

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(withRouter(NavPane));
