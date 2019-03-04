/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import shortid from 'shortid';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import ToolPanel from 'components/ToolPanel/ToolPanel';
import ContextEditor from 'components/chartcontext/ContextEditor/ContextEditor';
import TabNavigator from 'modules/visualizer/sort/sidebar/tabs/TabNavigator/TabNavigator';
import TabContent from 'modules/visualizer/sort/sidebar/tabs/TabContent/TabContent';
import data from 'modules/visualizer/sort/sidebar/VizSidebar.const';
import { formPath } from 'modules/visualizer/VisualizerModule.utils';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  position: fixed;
  right: 0;
  top: 40px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  border-radius: 0;
  height: calc(100vh - 40px);
`;

const code = 'vizID';

const propTypes = {
  data: PropTypes.array,
  history: PropTypes.object
};

const defaultProps = {
  data: data.sections
};

const VizSidebar = props => {
  return (
    <ComponentBase>
      {/*
      <SidebarContent>
        <ContextEditor />
        <ExplorePanelMediator {...otherProps} />
      </SidebarContent>*/}
      {/*<ToolPanel code={code} items={props.data} />*/}

      <TabNavigator code={code} navItems={props.data} />
      <TabContent code={code} data={props.data} />
    </ComponentBase>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
