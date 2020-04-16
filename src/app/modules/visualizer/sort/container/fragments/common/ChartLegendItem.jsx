/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'app/theme/Theme';
import FragmentInfoButton from 'app/components/Layout/ModuleFragment/common/FragmentInfoButton';

import { Tooltip } from 'react-tippy';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  height: max-content;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 8px auto;
`;

const LegendLabel = styled.div`
  max-width: 176px;
  font-size: 10px;
  font-family: ${theme.font.zoomFontFamTwo};
  line-height: 9px;
  &:after {
    color: black;
    content: '${props => props.text}';
  }
`;

const Box = styled.div`
  display: flex;
`;

const LegendColor = styled.div`
  width: 7px;
  height: 7px;
  margin-top: 2px;
  margin-right: 2px;
  background-color: ${props => props.color};
`;

const propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  dataSource: PropTypes.string
};
const defaultProps = {
  color: '#f47c69',
  dataSource: 'No Source?',
  text: ''
};

const ChartLegendItem = props => {
  return (
    <ComponentBase>
      <Box>
        <LegendColor color={props.color} />
        <LegendLabel text={props.text} data-cy="legend-label" />
      </Box>
      <FragmentInfoButton text={`Datasource: ${props.dataSource}`} />
    </ComponentBase>
  );
};

ChartLegendItem.propTypes = propTypes;
ChartLegendItem.defaultProps = defaultProps;

export default ChartLegendItem;
