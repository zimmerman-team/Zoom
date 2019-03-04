/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'theme/Theme';
import BaseTab from 'modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import IconDownload from 'assets/icons/sidebar/IconDownload';

/**
 * todo: Please write a short component description of what this component does
 * @param {Object} customProperty - please describe component property
 */

const DownloadItem = styled.div`
  color: red;
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 25%;
  outline: 1px solid black;
`;

const propTypes = {};
const defaultProps = {};

const DownloadTab = props => {
  return (
    <BaseTab>
      <ItemContainer>
        <IconDownload />
        <DownloadItem>JSON</DownloadItem>
      </ItemContainer>
      <DownloadItem>CSV</DownloadItem>
      <DownloadItem>XML</DownloadItem>
    </BaseTab>
  );
};

DownloadTab.propTypes = propTypes;
DownloadTab.defaultProps = defaultProps;

export default DownloadTab;
