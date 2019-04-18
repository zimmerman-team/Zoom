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
  state = {
    pane: this.props.dataPaneOpen
  };

  componentDidUpdate(prevProps) {
    if (this.props.dataPaneOpen !== prevProps.dataPaneOpen)
      this.setState({ pane: this.props.dataPaneOpen });
  }

  clickStartPaneItem = item => {
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
  };

  /* @amtmolecule todo: re-assess logic in this component, seems somewhat convoluted */
  renderPaneItems = () => {
    if (this.state.pane === paneTypes.privPane) {
      return startItems.map((item, index) => {
        const datacy = `nav-pane-item-${index}`;

        let targetURL = '';

        if (item.navTo === '/mapper') {
          targetURL = item.navTo;
        } else {
          targetURL = '#';
        }

        return (
          <NavPaneItem
            key={item.label}
            to={targetURL}
            // to={item.navTo}
            onClick={() => this.clickStartPaneItem(item)}
            data-cy={datacy}
          >
            <ItemIcon>
              <SvgIconPointer />
            </ItemIcon>
            <ItemLabel>{item.label}</ItemLabel>
          </NavPaneItem>
        );
      });
    }

    const data =
      this.state.pane === paneTypes.createChart
        ? createChartItems
        : convertDataItems;

    return data.map((item, index) => {
      const datacy = `nav-pane-item-${index}`;
      return (
        <NavPaneItem to={item.navTo} key={item.label} data-cy={datacy}>
          <ItemIcon>
            <SvgIconPointer />
          </ItemIcon>
          <ItemLabel>{item.label}</ItemLabel>
        </NavPaneItem>
      );
    });
  };

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
