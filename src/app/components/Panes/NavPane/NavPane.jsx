import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

/* consts */
import paneTypes from '__consts__/PaneTypesConst';

/* actions */
import * as actions from 'services/actions/general';

/* icons */
import SvgIconPointer from 'assets/icons/IconPointer';
import {
  startItems,
  createChartItems,
  convertDataItems
} from './NavPane.const';

/* styles */
import {
  NavPaneItem,
  ComponentBase,
  ItemLabel,
  ItemIcon
} from './NavPane.style';

/* todo: re-assess logic in this component, seems somewhat convoluted */

class NavPane extends React.PureComponent {
  state = {
    pane: this.props.dataPaneOpen,
    userRole: 'Regular user'
  };

  componentWillMount() {
    if (this.props.auth0Client) {
      this.props.auth0Client
        .getUserRole()
        .then(role => this.setState({ userRole: role }));
    } else {
      console.log('auth0Client not available, figure it out');
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataPaneOpen !== prevProps.dataPaneOpen)
      this.setState({ pane: this.props.dataPaneOpen });
  }

  clickStartPaneItem = item => {
    this.props.dispatch(actions.dataPaneToggleRequest(item));
    // so basically we will have some different logic for the
    // 'explore data' section when the user is in their dashboard
    // when clicked it will redirect the user to the home page
    // with the 'explora data'/ indicator pane open
    if (
      this.props.location.pathname.indexOf('/dashboard') !== -1 &&
      item === paneTypes.pubPane
    )
      this.props.history.push('/home');
  };

  renderPaneItems = () => {
    // console.log('pane type is: ', this.state.pane);
    switch (this.state.pane) {
      case paneTypes.privPane:
        return (
          <React.Fragment>
            <NavPaneItem
              to="#"
              onClick={() => this.clickStartPaneItem(paneTypes.createChart)}
              data-cy="nav-pane-item-0"
            >
              <ItemIcon>
                <SvgIconPointer />
              </ItemIcon>
              <ItemLabel>Create chart</ItemLabel>
            </NavPaneItem>

            {this.state.userRole != 'Regular user' && (
              <NavPaneItem to="/mapper" data-cy="nav-pane-item-1">
                <ItemIcon>
                  <SvgIconPointer />
                </ItemIcon>
                <ItemLabel>Convert data</ItemLabel>
              </NavPaneItem>
            )}

            <NavPaneItem
              to="#"
              onClick={() => this.clickStartPaneItem(paneTypes.pubPane)}
              data-cy="nav-pane-item-2"
            >
              <ItemIcon>
                <SvgIconPointer />
              </ItemIcon>
              <ItemLabel>Explore data</ItemLabel>
            </NavPaneItem>
          </React.Fragment>
        );

      case paneTypes.createChart:
        return createChartItems.map((item, index) => {
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

      case paneTypes.convertData:
        return convertDataItems.map((item, index) => {
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
    }
  };

  render() {
    console.log('render');
    return <ComponentBase>{this.renderPaneItems()}</ComponentBase>;
  }
}

const mapStateToProps = state => {
  return {
    dataPaneOpen: state.dataPaneOpen.open
  };
};

export default connect(mapStateToProps)(withRouter(NavPane));
