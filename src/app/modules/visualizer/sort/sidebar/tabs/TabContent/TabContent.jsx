/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import { formPath } from 'app/modules/visualizer/VisualizerModule.utils';
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

const ComponentBase = styled.div`
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);
`;

const propTypes = {
  data: PropTypes.array,
  outerHistory: PropTypes.shape({}),
  code: PropTypes.string
};
const defaultProps = {
  outerHistory: {}
};

/*todo: implement dropshadow */

class TabContent extends React.Component {
  // oke so we need to control rerendering of this component
  // because when it rerenders, all of these items that have been loaded
  // via these routes get remounted, and we don't want components remounting
  // so the only time they can remount is when the url changes
  // (which is actually when they change, hence remounts)
  // the mounted components should rerender themselves depending on the props
  // but they shouldn't be remounted!!!, which happeens when this get rendered
  shouldComponentUpdate(nextProps) {
    return (
      this.props.location.pathname !== nextProps.location.pathname ||
      this.props.chart !== nextProps.chart ||
      this.props.code !== nextProps.code
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.props.data.map(
          section =>
            section.component && (
              <PropsRoute
                auth0Client={this.props.auth0Client}
                outerHistory={this.props.outerHistory}
                selectAll={this.props.selectAll}
                dropDownData={this.props.dropDownData}
                key={shortid.generate()}
                path={formPath(this.props.code, section.path, this.props.chart)}
                component={section.component}
                code={this.props.code}
                chartTitle={this.props.chartTitle}
              />
            )
        )}
      </React.Fragment>
    );
  }
}

TabContent.propTypes = propTypes;
TabContent.defaultProps = defaultProps;

export default withRouter(TabContent);
