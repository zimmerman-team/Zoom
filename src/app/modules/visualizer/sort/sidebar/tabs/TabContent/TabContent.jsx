/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { formPath } from 'modules/visualizer/VisualizerModule.utils';
import shortid from 'shortid';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

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

const propTypes = {
  data: PropTypes.array,
  code: PropTypes.string
};
const defaultProps = {};

/*todo: implement dropshadow */

const TabContent = props => {
  return (
    <React.Fragment>
      {props.data.map(
        section =>
          section.component && (
            <PropsRoute
              key={shortid.generate()}
              path={formPath(props.code, section.path)}
              component={section.component}
              code={props.code}
            />
          )
      )}
    </React.Fragment>
  );
};

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default TabContent;
