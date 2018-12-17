/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
import { zoomGreyZero, PageHeading } from 'components/theme/ThemeSheet';
import { iatiDetailMockData } from '__mocks__/iatiDetailMock';
import {
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsBlue,
} from 'components/theme/ThemeSheet';

const ComponentBase = styled.div``;

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
  font-family: ${zoomFontFamTwo};
  color: ${aidsFondsBlue};
  line-height: 1;
`;

const propTypes = {
  data: PropTypes.object,
};
const defaultProps = {
  data: undefined,
};

const Header = props => {
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
    </React.Fragment>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
