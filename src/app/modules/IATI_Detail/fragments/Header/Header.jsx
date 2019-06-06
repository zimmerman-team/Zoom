/* base */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import ModuleFragment from 'components/Layout/ModuleFragment/ModuleFragment';

import { PageHeading } from 'components/sort/Headings';
import theme from 'theme/Theme';
import {
  DetailList,
  DetailListItem,
  ItemInfo,
  ItemLabel,
  Tooltip
} from './Header.styles';

const propTypes = {
  data: PropTypes.shape({
    timeline: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
        info: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf([PropTypes.string])
        ])
      })
    ),
    title: PropTypes.string,
    detail: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        info: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.arrayOf([PropTypes.string])
        ]),
        moreData: PropTypes.arrayOf(PropTypes.string)
      })
    )
  })
};
const defaultProps = {
  data: {
    timeline: [],
    title: '',
    detail: []
  }
};

class Header extends React.Component {
  state = {
    showMoreData: false
  };

  handleMouseEnter = () => {
    this.setState({ showMoreData: true });
  };

  handleMouseLeave = () => {
    this.setState({ showMoreData: false });
  };

  render() {
    return (
      <React.Fragment>
        <ModuleFragment background={theme.color.zoomGreyZero}>
          <DetailList paddingTop="40px">
            {get(this.props.data, 'timeline', []).map(item => (
              <DetailListItem key={item.id}>
                <ItemLabel>{item.label}</ItemLabel>
                <ItemInfo>{item.info}</ItemInfo>
              </DetailListItem>
            ))}
          </DetailList>
        </ModuleFragment>
        <ModuleFragment>
          <PageHeading data-cy="header">{this.props.data.title}</PageHeading>
        </ModuleFragment>
        <ModuleFragment background={theme.color.zoomGreyZero}>
          <DetailList>
            {get(this.props.data, 'detail', []).map(item => (
              <DetailListItem key={item.info}>
                <ItemLabel>{item.label}</ItemLabel>
                <ItemInfo
                  onMouseEnter={() => item.moreData && this.handleMouseEnter()}
                  onMouseLeave={() => item.moreData && this.handleMouseLeave()}
                >
                  {item.info}
                  {item.moreData && this.state.showMoreData && (
                    <Tooltip>{item.moreData.join(', ')}</Tooltip>
                  )}
                </ItemInfo>
              </DetailListItem>
            ))}
          </DetailList>
        </ModuleFragment>
      </React.Fragment>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
