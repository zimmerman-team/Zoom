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

/* actions */
import * as actions from 'services/actions/general';

/* icons */
import SvgIconPointer from 'assets/icons/IconPointer';

/* styles */
import {
  NavPaneItem,
  ComponentBase,
  ItemLabel,
  ItemIcon
} from './NavPane.style';

class NavPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pane: props.dataPaneOpen
    };

    this.renderPaneItems = this.renderPaneItems.bind(this);
    this.clickStartPaneItem = this.clickStartPaneItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataPaneOpen !== prevProps.dataPaneOpen)
      this.setState({ pane: this.props.dataPaneOpen });
  }

  clickStartPaneItem(item) {
    this.props.dispatch(actions.dataPaneToggleRequest(item.navTo));
    // so basically we will have some different logic for the
    // 'explore data' section when the user is in their dashboard
    // when clicked it will redirect the user to the home page
    // with the 'explora data'/ indicator pane open
    if (
      this.props.location.pathname.indexOf('/dashboard') !== -1 &&
      item.navTo === paneTypes.pubPane
    )
      this.props.history.push('/home');
  }

  renderPaneItems() {
    if (this.state.pane === paneTypes.privPane)
      return startItems.map(item => {
        return (
          <NavPaneItem
            key={item.label}
            to="#"
            onClick={() => this.clickStartPaneItem(item)}
            data-cy="nav-pane-item"
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
        <NavPaneItem to={item.navTo} key={item.label} data-cy="nav-pane-item">
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
