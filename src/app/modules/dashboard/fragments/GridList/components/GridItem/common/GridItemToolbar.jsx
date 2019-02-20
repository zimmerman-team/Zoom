/* base */
import React from 'react';
import styled from 'styled-components';

/* components */
import GridItemToolbarTab from './GridItemToolbarTab';
import SvgIconEdit from '../../../../../../../assets/icons/IconEdit';
import SvgIconList from '../../../../../../../assets/icons/IconList';
import SvgIconDelete from '../../../../../../../assets/icons/IconDelete';
import SvgIconDuplicate from '../../../../../../../assets/icons/IconDuplicate';

const ComponentBase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const GridItemToolbar = props => {
  return (
    <ComponentBase>
      <GridItemToolbarTab icon={<SvgIconEdit />} indexTab="0" />
      <GridItemToolbarTab icon={<SvgIconList />} indexTab="1" />
      <GridItemToolbarTab icon={<SvgIconDuplicate />} indexTab="2" />
      <GridItemToolbarTab icon={<SvgIconDelete />} indexTab="3" />
    </ComponentBase>
  );
};

export default GridItemToolbar;
