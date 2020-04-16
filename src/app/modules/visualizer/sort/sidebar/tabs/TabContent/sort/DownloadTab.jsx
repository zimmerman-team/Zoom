/* base */
import React from 'react';
import styled from 'styled-components';
import theme from 'app/theme/Theme';
import BaseTab from 'app/modules/visualizer/sort/sidebar/tabs/TabContent/sort/common/BaseTab';
import IconDownload from 'app/assets/icons/sidebar/IconDownload';
import html2canvas from 'html2canvas';

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
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : 'all')};

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

const downloadImage = name => {
  const node = document.getElementById('viz-container');
  html2canvas(node, { allowTaint: true, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style = 'display: none';
    a.href = imgData;
    a.download = `${name}.png`;
    a.click();
    window.URL.revokeObjectURL(imgData);
    a.parentNode.removeChild(a);
  });
};

const DownloadTab = ({ chartTitle }) => {
  return (
    <BaseTab>
      <ListContainer>
        <ItemContainer onClick={() => downloadImage(chartTitle)}>
          <ItemIcon />
          <DownloadItem data-cy="dowload-option-PNG">PNG</DownloadItem>
        </ItemContainer>

        {/*<ItemContainer disabled>*/}
        {/*<ItemIcon />*/}
        {/*<DownloadItem data-cy="dowload-option-JSON">JSON</DownloadItem>*/}
        {/*</ItemContainer>*/}

        {/*<ItemContainer disabled>*/}
        {/*<ItemIcon />*/}
        {/*<DownloadItem data-cy="dowload-option-CSV">CSV</DownloadItem>*/}
        {/*</ItemContainer>*/}

        {/*<ItemContainer disabled>*/}
        {/*<ItemIcon />*/}
        {/*<DownloadItem data-cy="dowload-option-XML">XML</DownloadItem>*/}
        {/*</ItemContainer>*/}
      </ListContainer>
    </BaseTab>
  );
};

DownloadTab.propTypes = propTypes;
DownloadTab.defaultProps = defaultProps;

export default DownloadTab;
