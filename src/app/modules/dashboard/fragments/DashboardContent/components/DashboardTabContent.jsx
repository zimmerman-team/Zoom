/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import DashboardTabNavigator from 'modules/dashboard/fragments/DashboardContent/components/DashboardTabNavigator';
import { data } from 'modules/dashboard/fragments/DashboardContent/DashboardContent.const';
import GridList from 'modules/dashboard/fragments/GridList/GridList';
import GridListOptionsPane from 'modules/dashboard/fragments/GridList/components/GridListOptionsPane/GridListOptionsPane';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  width: 100%;
  max-width: 1024px;
  justify-content: center;

  min-height: 250px;
  flex-direction: column;
`;

const Message = styled.div`
  display: flex;
  font-size: 32px;
  text-align: center;
  align-self: center;
  justify-self: center;
  line-height: 1;
  color: ${theme.color.zoomBlack};
  font-family: ${theme.font.zoomFontFamOne};
`;

const propTypes = {
  data: PropTypes.array,
  tabContentName: PropTypes.string
};
const defaultProps = {
  data: [],
  tabContentName: 'Charts'
};

const DashboardTabContent = props => {
  return (
    <ComponentBase>
      {props.data.length === 0 && (
        <Message>No item in {props.tabContentName}</Message>
      )}

      <GridListOptionsPane />

      {props.data.length > 0 && <GridList items={props.data} />}
    </ComponentBase>
  );
};

DashboardTabContent.propTypes = propTypes;
DashboardTabContent.defaultProps = defaultProps;

export default DashboardTabContent;
