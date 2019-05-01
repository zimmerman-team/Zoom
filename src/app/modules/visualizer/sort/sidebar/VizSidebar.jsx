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

// const code = 'vizID';

const propTypes = {
  /* todo: pass indicator data to tab content*/

  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
  auth0Client: PropTypes.shape({}),
  display: PropTypes.bool,
  /** contains data for generation of tab nav items and providing the tab content with the proper components */
  data: PropTypes.array
};

const defaultProps = {
  display: true,
  data: data.sections,
  auth0Client: PropTypes.shape({}),
  visible: true,
  loggedIn: true
};

/*todo: implement show/hide based on material-ui drawer component*/

const VizSidebar = props => {
  // console.log('display? ', props.display);
  return (
    /** component base container */
    <ComponentBase
      style={{
        display: props.display ? 'flex' : 'none'
      }}
    >
      {/** tab navigator */}
      {props.loggedIn && (
        <TabNavigator
          code={props.code}
          chart={props.chartType}
          navItems={props.data}
        />
      )}

      {/** tab content */}
      <TabContent
        auth0Client={props.auth0Client}
        outerHistory={props.outerHistory}
        chart={props.chartType}
        code={props.code}
        data={props.data}
        dropDownData={props.dropDownData}
      />
    </ComponentBase>
  );
};

VizSidebar.propTypes = propTypes;
VizSidebar.defaultProps = defaultProps;

export default VizSidebar;
