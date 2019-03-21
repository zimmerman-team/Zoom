/* base */
import React from 'react';
import PropTypes from 'prop-types';

import TabNavigator from 'modules/visualizer/sort/sidebar/tabs/TabNavigator/TabNavigator';
import TabContent from 'modules/visualizer/sort/sidebar/tabs/TabContent/TabContent';
import data from 'modules/visualizer/sort/sidebar/VizSidebar.const';
import { ComponentBase } from './VizSidebar.style';

/**
 * The VizSidebar acts as a container component for the tab navigator and tab content
 */

const code = 'vizID';

const propTypes = {
  /* todo: pass indicator data to tab content*/

  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
  /** contains data for generation of tab nav items and providing the tab content with the proper components */
  data: PropTypes.array
};

const defaultProps = {
  data: data.sections,
  visible: true,
  loggedIn: true
};

/*todo: implement show/hide based on material-ui drawer component*/

const VizSidebar = props => {
  return (
    /** component base container */
    <ComponentBase>
      {/** tab navigator */}
      {props.loggedIn && <TabNavigator code={code} navItems={props.data} />}

      {/** tab content */}
      <TabContent
        code={code}
        data={props.data}
        dropDownData={props.dropDownData}
      />
    </ComponentBase>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
