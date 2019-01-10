/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import ModuleFragment from 'components/layout/ModuleFragment/ModuleFragment';
// import { iatiDetailMockData } from '__mocks__/iatiDetailMock';
import {
  zoomFontFamOne,
  zoomFontFamTwo,
  aidsFondsBlue,
  zoomGreyZero,
  PageHeading
} from 'components/theme/ThemeSheet';

// const ComponentBase = styled.div``;

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
  data: PropTypes.shape({
    timeline: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf([PropTypes.string]),
      ])
    })),
    title: PropTypes.string,
    detail: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      info: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf([PropTypes.string]),
      ])
    })),
  }),
};
const defaultProps = {
  data: {
    timeline: [],
    title: '',
    detail: [],
  },
};

const Header = props => {
  console.log(props.data);
  return (
    <React.Fragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {get(props.data, 'timeline', []).map(item => (
            <DetailListItem key={item.info}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemInfo>{item.info}</ItemInfo>
            </DetailListItem>
          ))}
        </DetailList>
      </ModuleFragment>
      <ModuleFragment>
        <PageHeading>{props.data.title}</PageHeading>
      </ModuleFragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {get(props.data, 'detail', []).map(item => (
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
