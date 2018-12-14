/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AppBar from 'components/navigation/AppBar/AppBar';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { iatiDetailMockData } from '__mocks__/iatiDetailMock';
import { treeMapMockData } from '__mocks__/treeMapMock';

import {
  aidsFondsBlue,
  zoomFontFamOne,
  zoomFontFamTwo,
  zoomGreyOne,
  zoomGreyZero,
  PageHeading,
  FragmentHeader,
  FragmentVisualisation,
} from 'components/theme/ThemeSheet';
import TreeMap from 'components/charts/treemap/TreeMap';

const DetailList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
`;

const DetailListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-bottom: 30px;
`;

const ItemLabel = styled.div`
  color: #000;
  font-family: ${zoomFontFamOne};
  line-height: 1;
  margin-bottom: 9px;
`;
const ItemInfo = styled.div`
  color: ${aidsFondsBlue};
  line-height: 1;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const IatiDetail = props => {
  return (
    <React.Fragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {iatiDetailMockData.timeline.map(item => (
            <DetailListItem key={item.info}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemInfo>{item.info}</ItemInfo>
            </DetailListItem>
          ))}
        </DetailList>
      </ModuleFragment>
      <ModuleFragment>
        <PageHeading>IATI Project detail page title</PageHeading>
      </ModuleFragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {iatiDetailMockData.detail.map(item => (
            <DetailListItem key={item.info}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemInfo>{item.info}</ItemInfo>
            </DetailListItem>
          ))}
        </DetailList>
      </ModuleFragment>
      <ModuleFragment>
        <FragmentHeader>Total budget</FragmentHeader>
      </ModuleFragment>
      <ModuleFragment background={zoomGreyZero}>
        <FragmentHeader>Sectors</FragmentHeader>
        <FragmentVisualisation>
          <TreeMap data={treeMapMockData} />
        </FragmentVisualisation>
      </ModuleFragment>
    </React.Fragment>
  );
};

IatiDetail.propTypes = propTypes;
IatiDetail.defaultProps = defaultProps;

export default IatiDetail;
