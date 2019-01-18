/* base */
import React, { Component } from 'react';
import styled from 'styled-components';
import GeoMap from 'components/geo/GeoMap/GeoMap';
// import AppBar from 'components/navigation/AppBar/AppBar';
import { Box } from 'grommet';
// import SideBar from 'components/navigation/SideBar/SideBar';
import {
  ControlPanelContainer,
  DropDownContainer,
  PanelDuo,
} from 'modules/home/HomeModule.styles';
import { yearDropDown } from 'modules/home/HomeModule.utils';
import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import PropTypes from 'prop-types';

const ModuleContainer = styled(Box)``;

const DataPaneContainer = styled.div``;

const propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.shape),
};

const defaultProps = {
  indicators: [],
};

class HomeModule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: true,
      sideBarOpen: false,
      indicators: [],
    };

    this.onClose = this.onClose.bind(this);
    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  onClose = () => {
    this.setState({ dialogOpen: false });
  };

  toggleSideBar = () => {
    this.setState({ sideBarOpen: true });
  };

  render() {
    const { indicators, ...otherProps } = this.props;

    return (
      <React.Fragment>
        <ModuleContainer>
          {/*<BaseDialog open={this.state.dialogOpen} onClose={this.onClose} />*/}

          <GeoMap indicatorData={indicators} />

          <ControlPanelContainer>
            <ExplorePanelMediator {...otherProps} />

            {/*<Box>
              <PanelDuo>
                <DropDownContainer>
                  <div>Indicator 1</div>
                  <IndicatorDropMediator
                    valueSelected={this.props.selectedInd1}
                    selectVal={this.props.selectInd1}
                    allIndicatorNames={this.props.allIndNames}
                  />
                </DropDownContainer>
                <DropDownContainer>
                  <div>Year</div>
                  <Select
                    placeholder='Select'
                    value={this.props.selectedYear1}
                    options={yearDropDown}
                    onChange={this.props.selectYear1}
                  />
                </DropDownContainer>
              </PanelDuo>
              <PanelDuo>
                <DropDownContainer>
                  <div>Indicator 2</div>
                  <IndicatorDropMediator
                    valueSelected={this.props.selectedInd2}
                    selectVal={this.props.selectInd2}
                    allIndicatorNames={this.props.allIndNames}
                  />
                </DropDownContainer>
                <DropDownContainer>
                  <div>Year</div>
                  <Select
                    placeholder='Select'
                    value={this.props.selectedYear2}
                    options={yearDropDown}
                    onChange={this.props.selectYear2}
                  />
                </DropDownContainer>
              </PanelDuo>
            </Box>*/}
          </ControlPanelContainer>
        </ModuleContainer>
      </React.Fragment>
    );
  }
}
HomeModule.propTypes = propTypes;
HomeModule.defaultProps = defaultProps;

export default HomeModule;
