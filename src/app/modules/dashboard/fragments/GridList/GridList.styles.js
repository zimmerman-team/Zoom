import Theme from 'theme/Theme';
import styled from 'styled-components';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export const Container = styled(MuiGridList)`
  padding-bottom: 40px !important;
  //justify-content: space-between;
  flex-wrap: wrap;
  width: 1024px;
  overflow: initial!important;
`;
