/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import FragmentInfoButton from 'components/Layout/ModuleFragment/common/FragmentInfoButton';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const ComponentBase = styled.div`
  display: flex;
  flex-direction: row;
  width: 200px;
  height: 20px;
  align-items: center;
  margin-right: 100px;
  justify-content: space-between;
`;

const LegendLabel = styled.div`
  font-size: 10px;
  font-family: ${theme.font.zoomFontFamTwo};
  line-height: 7px;
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
  margin-right: 2px;
  background-color: ${props => props.color};
`;

const propTypes = {};
const defaultProps = {};

const ChartLegendItem = () => {
  return (
    <ComponentBase>
      <Box>
        <LegendColor color="#f47c69" />
        <LegendLabel text="lorem ipsum empty" />
      </Box>
      <FragmentInfoButton />
    </ComponentBase>
  );
};

ChartLegendItem.propTypes = propTypes;
ChartLegendItem.defaultProps = defaultProps;

export default ChartLegendItem;
