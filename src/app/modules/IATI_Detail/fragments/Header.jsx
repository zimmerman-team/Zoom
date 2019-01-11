/* base */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import get from 'lodash/get';
import { Box } from 'grommet';
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
  position: relative;
`;

const Tooltip = styled(Box)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 250px;
  background-color: white;
  padding: 20px;
  z-index: 2;
  border-radius: 2%;
  font-family: ${zoomFontFamTwo};
  line-height: 1.3;
`;

const propTypes = {
  data: PropTypes.shape({
    timeline: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
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
      ]),
      moreData: PropTypes.arrayOf(PropTypes.string),
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

class Header extends React.Component {
  state = {
    showMoreData: false,
  }

  handleMouseEnter() {
    this.setState({ showMoreData: true });
  }

  handleMouseLeave() {
    this.setState({ showMoreData: false });
  }

  render() {
  return (
    <React.Fragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {get(this.props.data, 'timeline', []).map(item => (
            <DetailListItem key={item.id}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemInfo>{item.info}</ItemInfo>
            </DetailListItem>
          ))}
        </DetailList>
      </ModuleFragment>
      <ModuleFragment>
        <PageHeading>{this.props.data.title}</PageHeading>
      </ModuleFragment>
      <ModuleFragment background={zoomGreyZero}>
        <DetailList>
          {get(this.props.data, 'detail', []).map(item => (
            <DetailListItem key={item.info}>
              <ItemLabel>{item.label}</ItemLabel>
              <ItemInfo
                onMouseEnter={() => item.moreData && this.handleMouseEnter()}
                onMouseLeave={() => item.moreData && this.handleMouseLeave()}
              >
                {item.info}
                {item.moreData && this.state.showMoreData &&
                <Tooltip>
                  {item.moreData.join(', ')}
                </Tooltip>
              }
              </ItemInfo>
            </DetailListItem>
          ))}
        </DetailList>
      </ModuleFragment>
    </React.Fragment>
  );
  }
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
