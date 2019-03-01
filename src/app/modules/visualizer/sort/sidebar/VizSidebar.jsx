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
  //justify-content: flex-end;
  //align-content: flex-end;
  border-radius: 0;

  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  height: calc(100vh - 40px);
`;

const SidebarNavigator = styled.div`
  //width: 320px;
  //height: 50px;
  //background-color: #a1a1a1;
  align-self: flex-end;
`;
const SidebarContent = styled.div`
  display: flex;
  background-color: ${theme.color.aidsFondsWhite};
`;

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return React.createElement(component, finalProps);
};

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        return renderMergedProps(component, routeProps, rest);
      }}
    />
  );
};

const code = 'vizID';

const propTypes = {
  data: PropTypes.array,
  history: PropTypes.object
};

const defaultProps = {
  data: data.sections
};

const VizSidebar = props => {
  // console.log('sidebar', props);
  // const { ...otherProps } = props;

  return (
    //<Router>
    <ComponentBase>
      {/*<SidebarNavigator>
       <ToolPanel />
      </SidebarNavigator>

      <SidebarContent>
        <ContextEditor />
        <ExplorePanelMediator {...otherProps} />
      </SidebarContent>*/}
      <ToolPanel code={code} items={props.data} />
      {/*<TabNavigator code={code} navItems={props.data} />*/}
      <TabContent>
        {props.data.map(section => (
          <PropsRoute
            key={shortid.generate()}
            path={formPath(code, section.path)}
            component={section.component}
            // history={this.props.history}
            code={code}
          />
        ))}
      </TabContent>
    </ComponentBase>
    // </Router>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
