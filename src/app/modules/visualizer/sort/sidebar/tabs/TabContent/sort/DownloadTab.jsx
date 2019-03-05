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

const ListContainer = styled.div`
  padding: 15px;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const ItemIcon = styled(IconDownload)`
  margin-right: 10px;
`;

const DownloadItem = styled.div`
  color: ${theme.color.aidsFondsRed};
  font-family: ${theme.font.zoomFontFamTwo};
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
`;

const propTypes = {};
const defaultProps = {};

/*todo: tidy up this component*/

const DownloadTab = () => {
  return (
    <BaseTab>
      <ListContainer>
        <ItemContainer>
          <ItemIcon />
          <DownloadItem>JSON</DownloadItem>
        </ItemContainer>

        <ItemContainer>
          <ItemIcon />
          <DownloadItem>CSV</DownloadItem>
        </ItemContainer>

        <ItemContainer>
          <ItemIcon />
          <DownloadItem>XML</DownloadItem>
        </ItemContainer>
      </ListContainer>
    </BaseTab>
  );
};

DownloadTab.propTypes = propTypes;
DownloadTab.defaultProps = defaultProps;

export default DownloadTab;
