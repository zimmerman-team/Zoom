/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import ZoomButton from 'components/ZoomButton/ZoomButton';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  //height: 80px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.color.zoomGreyFour};
`;

const InformationText = styled.p`
  font-size: 14px;
  color: black;
  margin: 0;
  padding: 0;
  width: 200px;
  line-height: 1;
  text-align: center;
`;

const ClickText = styled.span`
  font-size: 14px;
  color: red;
  margin: 0;
  padding: 0;
  width: 200px;
  line-height: 1;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const propTypes = {
  handleClick: PropTypes.func
};
const defaultProps = {};

const DuplicatorTab = props => {
  return (
    <BaseTab>
      <Box>
        {/* duplicator button */}
        <ZoomButton
          plain
          label="Duplicate chart to dashboard"
          fontSize={14}
          width={225}
          onClick={props.handleClick}
        />
      </Box>

      {/* todo: also create failure message */}
      <Box>
        <InformationText>
          Succesfully duplicated Untttled chart 01 copy to your dashboard!
        </InformationText>
        <ClickText>Click here to edit this chart</ClickText>
        <InformationText>
          The current chart will be autosaved to your dashboard.
        </InformationText>
      </Box>
    </BaseTab>
  );
};

DuplicatorTab.propTypes = propTypes;
DuplicatorTab.defaultProps = defaultProps;

export default DuplicatorTab;