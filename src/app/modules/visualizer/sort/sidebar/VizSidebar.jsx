/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TabNavigator from 'modules/visualizer/sort/sidebar/tabs/TabNavigator/TabNavigator';
import TabContent from 'modules/visualizer/sort/sidebar/tabs/TabContent/TabContent';
import data from 'modules/visualizer/sort/sidebar/VizSidebar.const';

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

/*todo: implement show/hide based on material-ui drawer component*/

const VizSidebar = props => {
  return (
    <ComponentBase>
      <TabNavigator code={code} navItems={props.data} />
      <TabContent code={code} data={props.data} />
    </ComponentBase>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
