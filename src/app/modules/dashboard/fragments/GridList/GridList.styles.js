import Theme from 'theme/Theme';
import styled from 'styled-components';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export const Container = styled(MuiGridList)`
  padding-bottom: 40px !important;
`;

export const GridListItem = styled(GridListTile)`
  && {
    > div {
      padding: 12px 16px;
      background: ${Theme.color.zoomGreyZero};
      box-shadow: 0 2px 4px 2px rgba(157, 157, 157, 0.5);
    }
  }
`;

export const GridListItemTitle = styled.div`
  font-size: 18px;
  font-weight: 300;
  margin-bottom: 10px;
  color: ${Theme.color.aidsFondsRed};
  font-family: ${Theme.font.zoomFontFamTwo};
`;

export const GridListItemRow = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 300;
  margin-bottom: 3px;
  flex-direction: row;
  color: ${Theme.color.zoomBlack};
`;

export const GridListItemRowLabel = styled.div`
  font-weight: 700;
  margin-right: 5px;
  font-family: ${Theme.font.zoomFontFamOne};
`;

export const GridListItemRowValue = styled.div`
  font-weight: 300;
  font-family: ${Theme.font.zoomFontFamTwo};
`;
