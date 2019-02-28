/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import ExplorePanelMediator from 'mediators/ComponentMediators/ExplorePanelMediator/ExplorePanelMediator';
import ToolPanel from 'components/ToolPanel/ToolPanel';
import ContextEditor from 'components/chartcontext/ContextEditor/ContextEditor';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  position: sticky;
  right: 0;
  top: 40px;
  z-index: 9;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-content: flex-end;
  border-radius: 0;
  background-color: transparent;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  //height: calc(100vh - 40px);
`;

const SidebarNavigator = styled.div`
  //width: 320px;
  //height: 50px;
  //background-color: #a1a1a1;
  align-self: flex-end;
`;
const SidebarContent = styled.div`
  display: flex;
  background-color: white;
`;

const propTypes = {};
const defaultProps = {};

const VizSidebar = props => {
  const { ...otherProps } = props;
  return (
    <ComponentBase>
      <SidebarNavigator>
        {/*todo: create an actual SidebarNavigator component which is based on the toolpanel or refactor the toolpanel */}
        <ToolPanel />
      </SidebarNavigator>

      <SidebarContent>
        <ContextEditor />
        {/*<ExplorePanelMediator {...otherProps} />*/}
      </SidebarContent>
    </ComponentBase>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
